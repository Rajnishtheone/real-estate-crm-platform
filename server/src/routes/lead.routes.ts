import { Router } from 'express';
import * as controller from '../controllers/lead.controller';
import { authGuard } from '../middleware/authGuard';
import { authorize } from '../middleware/rbac';

const router = Router();

/**
 * @openapi
 * /api/v1/leads:
 *   post:
 *     tags: [Leads]
 *     summary: Submit a lead
 * /api/v1/leads/{id}/status:
 *   patch:
 *     tags: [Leads]
 *     summary: Update lead status
 *     security: [{ bearerAuth: [] }]
 */
router.post('/', controller.createLead); // public submission
router.patch('/:id/status', authGuard, authorize('AGENT','ADMIN'), controller.updateStatus);
router.get('/', authGuard, authorize('AGENT','ADMIN'), controller.listMine);
router.get('/analytics/summary', authGuard, authorize('ADMIN'), controller.analytics);

export default router;
