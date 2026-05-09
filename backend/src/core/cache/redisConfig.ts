import { Logger } from '../Logger';

const LOCAL_REDIS_HOSTS = new Set(['localhost', '127.0.0.1', '::1', '0.0.0.0']);

let cachedRedisUrl: string | null | undefined;
let warned = false;

export function getRedisUrl(): string | null {
  if (cachedRedisUrl !== undefined) return cachedRedisUrl;

  const rawUrl = process.env.REDIS_URL?.trim();
  if (!rawUrl) {
    cachedRedisUrl = null;
    return cachedRedisUrl;
  }

  try {
    const parsed = new URL(rawUrl);
    const isLocalhost = LOCAL_REDIS_HOSTS.has(parsed.hostname);
    const isHostedRuntime = process.env.RENDER === 'true' || process.env.NODE_ENV === 'production';

    if (isHostedRuntime && isLocalhost) {
      if (!warned) {
        Logger.warn('[Redis] Ignoring localhost REDIS_URL in hosted runtime. Background queues/cache are disabled.');
        warned = true;
      }
      cachedRedisUrl = null;
      return cachedRedisUrl;
    }

    cachedRedisUrl = rawUrl;
    return cachedRedisUrl;
  } catch {
    Logger.warn('[Redis] Invalid REDIS_URL. Background queues/cache are disabled.');
    cachedRedisUrl = null;
    return cachedRedisUrl;
  }
}

export function getRedisConnectionOptions(): Record<string, unknown> | null {
  const redisUrl = getRedisUrl();
  if (!redisUrl) return null;

  const parsed = new URL(redisUrl);
  return {
    host: parsed.hostname,
    port: Number(parsed.port || 6379),
    username: parsed.username || undefined,
    password: parsed.password || undefined,
    db: parsed.pathname.length > 1 ? Number(parsed.pathname.slice(1)) : undefined,
    tls: parsed.protocol === 'rediss:' ? {} : undefined,
  };
}
