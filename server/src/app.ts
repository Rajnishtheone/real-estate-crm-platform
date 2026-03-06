import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { requestId } from './middleware/requestId';
import { logger } from './config/logger';
import { swaggerSpec } from './config/swagger';
import { env } from './config/env';

const app = express();

app.use(requestId);
app.use(
  pinoHttp({
    logger,
    customProps: (req) => ({ requestId: req.headers['x-request-id'] }),
  })
);
app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL.split(',') || '*', credentials: true }));
app.use(express.json({ limit: '2mb' }));

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', routes);

app.use(errorHandler);

export default app;
