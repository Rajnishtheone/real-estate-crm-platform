import { propertyRepo } from '../repositories/property.repo';
import { buildPagination } from '../utils/pagination';
import { ApiError } from '../utils/ApiError';
import { PropertyStatus } from '@prisma/client';
import cloudinary from '../config/cloudinary';
import redis from '../config/redis';
import { logger } from '../config/logger';

const cacheTTL = 60; // seconds

const cacheKey = (query: any) => `property:list:${JSON.stringify(query)}`;

const invalidateCache = async () => {
  try {
    let cursor = '0';
    const keys: string[] = [];
    do {
      const res = await redis.scan(cursor, 'MATCH', 'property:list:*', 'COUNT', 100);
      cursor = res[0];
      keys.push(...res[1]);
    } while (cursor !== '0');
    if (keys.length) await redis.del(keys);
  } catch (err) {
    logger.warn({ err }, 'Redis invalidate failed');
  }
};

const uploadImages = async (files?: Express.Multer.File[]) => {
  if (!files || !files.length) return [];
  const uploads = files.map((file) =>
    cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
      folder: 'properties',
      resource_type: 'image',
    })
  );
  const results = await Promise.all(uploads);
  return results.map((r) => ({ url: r.secure_url, altText: r.original_filename }));
};

export const PropertyService = {
  async list(query: any) {
    const { take, skip } = buildPagination(Number(query.page), Number(query.limit));
    const where: any = {};
    if (query.city) where.locationCity = query.city;
    if (query.type) where.type = query.type;
    if (query.bedrooms) where.bedrooms = Number(query.bedrooms);
    if (query.status) where.status = query.status;
    if (query.minPrice || query.maxPrice) {
      where.price = {
        gte: query.minPrice ? Number(query.minPrice) : undefined,
        lte: query.maxPrice ? Number(query.maxPrice) : undefined,
      };
    }
    let sort: any = { createdAt: 'desc' };
    if (query.sort === 'price') sort = { price: 'asc' };
    else if (query.sort === '-price') sort = { price: 'desc' };
    else if (query.sort === 'createdAt') sort = { createdAt: 'asc' };
    else if (query.sort === '-createdAt') sort = { createdAt: 'desc' };

    const key = cacheKey({ ...query, take, skip, sort });
    try {
      const cached = await redis.get(key);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (err) {
      logger.warn({ err }, 'Redis get failed');
    }

    const [items, total] = await Promise.all([
      propertyRepo.list(where, sort, skip, take),
      propertyRepo.count(where),
    ]);
    const payload = {
      items,
      pagination: { page: Number(query.page) || 1, total, pages: Math.ceil(total / take), limit: take },
    };
    try {
      await redis.set(key, JSON.stringify(payload), 'EX', cacheTTL);
    } catch (err) {
      logger.warn({ err }, 'Redis set failed');
    }
    return payload;
  },
  async get(id: string) {
    return propertyRepo.findById(id);
  },
  async create(data: any, agentId: string, files?: Express.Multer.File[]) {
    const images = await uploadImages(files);
    const property = await propertyRepo.create({ ...data, agentId, ownerId: data.ownerId || agentId, images });
    await invalidateCache();
    return property;
  },
  async update(id: string, data: any, userId: string, files?: Express.Multer.File[], role?: string) {
    const existing = await propertyRepo.findById(id);
    if (!existing) throw new ApiError(404, 'Property not found');
    if (role !== 'ADMIN' && existing.agentId !== userId && existing.ownerId !== userId) throw new ApiError(403, 'Forbidden');
    const images = await uploadImages(files);
    const property = await propertyRepo.update(id, data, images);
    await invalidateCache();
    return property;
  },
  async remove(id: string, userId: string, role?: string) {
    const existing = await propertyRepo.findById(id);
    if (!existing) throw new ApiError(404, 'Property not found');
    if (role !== 'ADMIN' && existing.agentId !== userId && existing.ownerId !== userId) throw new ApiError(403, 'Forbidden');
    await propertyRepo.remove(id);
    await invalidateCache();
  },
  async setStatus(id: string, status: PropertyStatus) {
    const property = await propertyRepo.setStatus(id, status);
    await invalidateCache();
    return property;
  },
};
