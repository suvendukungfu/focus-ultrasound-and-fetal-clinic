import Redis from 'ioredis';
import { Logger } from '../Logger';

class RedisCache {
  private client: Redis;

  constructor() {
    this.client = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        return Math.min(times * 50, 2000);
      }
    });

    this.client.on('error', (err) => {
      Logger.error(`Redis Error: ${err.message}`);
    });

    this.client.on('connect', () => {
      Logger.info('⚡ Redis Cache Connected');
    });
  }

  get connection() {
    return this.client;
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<'OK'> {
    if (ttlSeconds) {
      return this.client.set(key, value, 'EX', ttlSeconds);
    }
    return this.client.set(key, value);
  }

  async del(key: string): Promise<number> {
    return this.client.del(key);
  }
}

export const redisCache = new RedisCache();
export const redisClient = redisCache.connection;
