import Redis from 'ioredis';
import { Logger } from '../Logger';

class RedisCache {
  private client: Redis;

  constructor() {
    if (!process.env.REDIS_URL) {
      Logger.warn('[RedisCache] No REDIS_URL provided. Using in-memory stub (no caching).');
      this.client = {
        on: () => {},
        get: async () => null,
        set: async () => 'OK',
        del: async () => 0,
        flushall: async () => 'OK',
        status: 'end'
      } as unknown as Redis;
      return;
    }

    this.client = new Redis(process.env.REDIS_URL, {
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
