import { Router } from 'express';
import authRoutes from './auth.routes';
import propertyRoutes from './property.routes';
import leadRoutes from './lead.routes';
import documentRoutes from './document.routes';
import nriRoutes from './nri.routes';
import adminRoutes from './admin.routes';
import userRoutes from './user.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/properties', propertyRoutes);
router.use('/leads', leadRoutes);
router.use('/documents', documentRoutes);
router.use('/nri', nriRoutes);
router.use('/admin', adminRoutes);
router.use('/users', userRoutes);

router.get('/health', (_req, res) => res.json({ success: true, data: { status: 'ok', uptime: process.uptime() } }));
router.get('/metrics', async (_req, res) => {
  const mem = process.memoryUsage();
  res.json({
    success: true,
    data: {
      uptime: process.uptime(),
      memory: { rss: mem.rss, heapUsed: mem.heapUsed, heapTotal: mem.heapTotal },
      pid: process.pid,
    },
  });
});

export default router;
