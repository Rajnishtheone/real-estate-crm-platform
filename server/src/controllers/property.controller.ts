import { Request, Response, NextFunction } from 'express';
import { PropertyService } from '../services/property.service';
import { propertyCreateSchema, propertyUpdateSchema, propertyListQuerySchema } from '../validators/property.validators';
import { ApiError } from '../utils/ApiError';
import { success, created } from '../utils/response';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = propertyListQuerySchema.parse(req.query);
    const data = await PropertyService.list(filters);
    success(res, data.items, data.pagination);
  } catch (err) { next(err); }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const property = await PropertyService.get(req.params.id);
    if (!property) throw new ApiError(404, 'Property not found');
    success(res, property);
  } catch (err) { next(err); }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = propertyCreateSchema.parse(req.body);
    const files = (req as any).files as Express.Multer.File[] | undefined;
    const property = await PropertyService.create(body, req.user!.id, files);
    created(res, property);
  } catch (err) { next(err); }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = propertyUpdateSchema.parse(req.body);
    const files = (req as any).files as Express.Multer.File[] | undefined;
    const property = await PropertyService.update(req.params.id, body, req.user!.id, files, req.user!.role);
    success(res, property);
  } catch (err) { next(err); }
};

export const setStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;
    const property = await PropertyService.setStatus(req.params.id, status);
    success(res, property);
  } catch (err) { next(err); }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await PropertyService.remove(req.params.id, req.user!.id, req.user!.role);
    success(res, { id: req.params.id });
  } catch (err) { next(err); }
};
