import { Router } from 'express';
import multer from 'multer';
import * as controller from '../controllers/property.controller';
import { authGuard } from '../middleware/authGuard';
import { authorize } from '../middleware/rbac';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 5 },
});
const router = Router();

/**
 * @openapi
 * /api/v1/properties:
 *   get:
 *     summary: List properties with filters
 *     tags: [Properties]
 *   post:
 *     summary: Create property
 *     tags: [Properties]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/', controller.list);
router.get('/:id', controller.getById);
router.post('/', authGuard, authorize('AGENT','ADMIN'), upload.array('images', 5), controller.create);
router.put('/:id', authGuard, authorize('AGENT','ADMIN'), upload.array('images', 5), controller.update);
router.delete('/:id', authGuard, authorize('AGENT','ADMIN'), controller.remove);
router.patch('/:id/status', authGuard, authorize('ADMIN'), controller.setStatus);

export default router;
