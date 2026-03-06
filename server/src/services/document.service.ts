import cloudinary from '../config/cloudinary';
import { documentRepo } from '../repositories/document.repo';
import { ApiError } from '../utils/ApiError';
import { UploadApiResponse } from 'cloudinary';

export const DocumentService = {
  async upload(userId: string, file: Express.Multer.File, meta: { type: string; propertyId?: string; nriAccountId?: string }) {
    if (file.size > 10 * 1024 * 1024) throw new ApiError(400, 'File too large');
    const res = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
      folder: `users/${userId}/documents`,
      resource_type: 'auto',
    });
    const doc = await documentRepo.create({
      ownerUserId: userId,
      propertyId: meta.propertyId,
      nriAccountId: meta.nriAccountId,
      type: meta.type,
      url: res.secure_url,
      fileName: file.originalname,
      mimeType: file.mimetype,
      sizeBytes: file.size,
    });
    return doc;
  },
  listByUser(userId: string) {
    return documentRepo.listByUser(userId);
  },
};
