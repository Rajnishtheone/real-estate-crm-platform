import { Router } from 'express';
import * as controller from '../controllers/nri.controller';
import { authGuard } from '../middleware/authGuard';
import { authorize } from '../middleware/rbac';

const router = Router();

router.get('/account', authGuard, authorize('NRI'), controller.getAccount);
router.post('/rent-payments', authGuard, authorize('NRI'), controller.createRentPayment);

export default router;
