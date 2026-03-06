import { Request, Response, NextFunction } from 'express';
import { NriService } from '../services/nri.service';
import { success, created } from '../utils/response';

export const getAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await NriService.getAccount(req.user!.id);
    success(res, data);
  } catch (err) { next(err); }
};

export const createRentPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payment = await NriService.createRentPayment(req.user!.id, req.body);
    created(res, payment);
  } catch (err) { next(err); }
};
