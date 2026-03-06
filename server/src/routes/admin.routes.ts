import { Router } from 'express';
import * as controller from '../controllers/admin.controller';
import { authGuard } from '../middleware/authGuard';
import { authorize } from '../middleware/rbac';

const router = Router();

router.use(authGuard, authorize('ADMIN'));
router.patch('/properties/:id/approve', controller.approveProperty);
router.patch('/properties/:id/reject', controller.rejectProperty);
router.get('/users', controller.listUsers);
router.get('/leads/analytics', controller.leadAnalytics);

export default router;
