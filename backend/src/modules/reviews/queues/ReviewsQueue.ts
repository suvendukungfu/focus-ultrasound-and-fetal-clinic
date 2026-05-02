/**
 * ReviewsQueue
 * -----------
 * BullMQ Queue definition for all review-related background jobs.
 * Follows the same Redis connection pattern as LeadQueue.ts.
 */
import { Queue, QueueEvents } from 'bullmq';
import { Logger } from '../../../core/Logger';

const redisUrl = new URL(process.env.REDIS_URL || 'redis://localhost:6379');

export const redisConnection = {
  host: redisUrl.hostname,
  port: Number(redisUrl.port || 6379),
  username: redisUrl.username || undefined,
  password: redisUrl.password || undefined,
  db: redisUrl.pathname.length > 1 ? Number(redisUrl.pathname.slice(1)) : undefined,
};

export const REVIEWS_QUEUE_NAME = 'ReviewsQueue';

/** Typed union of all review job names for exhaustive handling in the worker */
export type ReviewJobName =
  | 'fetch-google-reviews'
  | 'rotate-testimonials';

export const reviewsQueue = new Queue<Record<string, unknown>, unknown, ReviewJobName>(
  REVIEWS_QUEUE_NAME,
  {
    connection: redisConnection,
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
      removeOnComplete: { count: 100 },
      removeOnFail: { count: 50 },
    },
  }
);

export const reviewsQueueEvents = new QueueEvents(REVIEWS_QUEUE_NAME, {
  connection: redisConnection,
});

reviewsQueueEvents.on('completed', ({ jobId }) => {
  Logger.info(`[ReviewsQueue] Job ${jobId} completed ✅`);
});

reviewsQueueEvents.on('failed', ({ jobId, failedReason }) => {
  Logger.error(`[ReviewsQueue] Job ${jobId} failed ❌: ${failedReason}`);
});
