import { Request, Response, NextFunction } from 'express';
import { LeadService } from '../services/lead.service';
import { leadCreateSchema, leadStatusSchema } from '../validators/lead.validators';
import { success, created } from '../utils/response';

export const createLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = leadCreateSchema.parse(req.body);
    const lead = await LeadService.create(data, req.user?.id);
    created(res, lead);
  } catch (err) { next(err); }
};

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = leadStatusSchema.parse(req.body);
    const lead = await LeadService.updateStatus(req.params.id, status, req.user!.id, req.user!.role);
    success(res, lead);
  } catch (err) { next(err); }
};

export const analytics = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await LeadService.analytics();
    success(res, data);
  } catch (err) { next(err); }
};

export const listMine = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leads = await LeadService.listForUser(req.user!.id, req.user!.role);
    success(res, leads);
  } catch (err) { next(err); }
};
