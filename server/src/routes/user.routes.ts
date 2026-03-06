import { Router } from 'express';
import * as controller from '../controllers/user.controller';
import { authGuard } from '../middleware/authGuard';

const router = Router();
router.get('/me', authGuard, controller.me);
export default router;
