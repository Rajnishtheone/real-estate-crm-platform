import Redis from 'ioredis';
import { env } from './env';

const redis = env.REDIS_URL
  ? new Redis(env.REDIS_URL)
  : new Redis({ host: env.REDIS_HOST || '127.0.0.1', port: env.REDIS_PORT || 6379 });

redis.on('error', (err) => console.error('Redis error', err));

export default redis;
