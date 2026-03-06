import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as controller from '../controllers/auth.controller';

const router = Router();
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50, standardHeaders: true, legacyHeaders: false });

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 * /api/v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login and get tokens
 * /api/v1/auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Refresh access token
 * /api/v1/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout and revoke refresh token
 */
router.post('/register', authLimiter, controller.register);
router.post('/login', authLimiter, controller.login);
router.post('/refresh', controller.refresh);
router.post('/logout', controller.logout);

export default router;
