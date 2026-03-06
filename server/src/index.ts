import './config/env';
import app from './app';
import { env } from './config/env';
import { logger } from './config/logger';

const port = env.PORT || 4000;
app.listen(port, () => {
  logger.info(`API listening on port ${port}`);
});
