import { Request, Response, NextFunction } from 'express';
import { PropertyService } from '../services/property.service';
import { LeadService } from '../services/lead.service';
import { userRepo } from '../repositories/user.repo';
import { success } from '../utils/response';

export const approveProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const property = await PropertyService.setStatus(req.params.id, 'ACTIVE');
    success(res, property);
  } catch (err) { next(err); }
};

export const rejectProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const property = await PropertyService.setStatus(req.params.id, 'REJECTED');
    success(res, property);
  } catch (err) { next(err); }
};

export const listUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userRepo.list();
    success(res, users);
  } catch (err) { next(err); }
};

export const leadAnalytics = async (_req: Request, res: Response, next: NextFunction) => {
  try { success(res, await LeadService.analytics()); } catch (err) { next(err); }
};
