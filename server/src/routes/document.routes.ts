import { Router } from 'express';
import multer from 'multer';
import * as controller from '../controllers/document.controller';
import { authGuard } from '../middleware/authGuard';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

/**
 * @openapi
 * /api/v1/documents:
 *   post:
 *     tags: [Documents]
 *     summary: Upload a document
 *     security: [{ bearerAuth: [] }]
 * /api/v1/documents/me:
 *   get:
 *     tags: [Documents]
 *     summary: List my documents
 *     security: [{ bearerAuth: [] }]
 */
router.post('/', authGuard, upload.single('file'), controller.upload);
router.get('/me', authGuard, controller.listMine);

export default router;
