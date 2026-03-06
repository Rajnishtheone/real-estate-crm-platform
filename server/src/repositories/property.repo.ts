import { prisma } from './prisma';
import { PropertyStatus } from '@prisma/client';

export const propertyRepo = {
  create: (data: any) =>
    prisma.property.create({
      data: {
        ...data,
        images: data.images?.length ? { create: data.images } : undefined,
      },
      include: { images: true },
    }),
  update: (id: string, data: any, images?: { url: string; altText?: string }[]) =>
    prisma.property.update({
      where: { id },
      data: {
        ...data,
        images: images?.length
          ? {
              createMany: {
                data: images.map((img) => ({ ...img })),
              },
            }
          : undefined,
      },
      include: { images: true },
    }),
  findById: (id: string) => prisma.property.findUnique({ where: { id }, include: { images: true, agent: true } }),
  list: (where: any, orderBy: any, skip: number, take: number) =>
    prisma.property.findMany({ where, orderBy, skip, take, include: { images: true, agent: true } }),
  count: (where: any) => prisma.property.count({ where }),
  setStatus: (id: string, status: PropertyStatus) => prisma.property.update({ where: { id }, data: { status } }),
  remove: async (id: string) =>
    prisma.$transaction([
      prisma.propertyImage.deleteMany({ where: { propertyId: id } }),
      prisma.property.delete({ where: { id } }),
    ]),
};
