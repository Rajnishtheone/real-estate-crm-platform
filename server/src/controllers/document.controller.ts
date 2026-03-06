import { Request, Response, NextFunction } from 'express';
import { DocumentService } from '../services/document.service';
import { documentUploadSchema } from '../validators/document.validators';
import { ApiError } from '../utils/ApiError';
import { success, created } from '../utils/response';

export const upload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) throw new ApiError(400, 'File missing');
    const meta = documentUploadSchema.parse(req.body);
    const document = await DocumentService.upload(req.user!.id, req.file, meta);
    created(res, document);
  } catch (err) { next(err); }
};

export const listMine = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await DocumentService.listByUser(req.user!.id);
    success(res, docs);
  } catch (err) { next(err); }
};
