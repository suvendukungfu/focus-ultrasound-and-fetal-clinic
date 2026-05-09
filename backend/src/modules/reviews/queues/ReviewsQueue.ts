/**
 * ReviewsQueue
 * -----------
 * BullMQ Queue definition for all review-related background jobs.
 * Follows the same Redis connection pattern as LeadQueue.ts.
 */
import { Queue, QueueEvents } from 'bullmq';
import { Logger } from '../../../core/Logger';
import { getRedisConnectionOptions, getRedisUrl } from '../../../core/cache/redisConfig';

const redisUrl = getRedisUrl();
const redisConnection = getRedisConnectionOptions();

export const REVIEWS_QUEUE_NAME = 'ReviewsQueue';

/** Typed union of all review job names for exhaustive handling in the worker */
export type ReviewJobName =
  | 'fetch-google-reviews'
  | 'rotate-testimonials';

let _reviewsQueue: Queue<Record<string, unknown>, unknown, ReviewJobName> | null = null;
let _reviewsQueueEvents: QueueEvents | null = null;

export const getReviewsQueue = () => {
  if (!_reviewsQueue) {
    if (!redisUrl || !redisConnection) {
      Logger.warn('[ReviewsQueue] Skipping Redis connection.');
      return null;
    }
    
    _reviewsQueue = new Queue<Record<string, unknown>, unknown, ReviewJobName>(
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
  }
  return _reviewsQueue;
};

export const getReviewsQueueEvents = () => {
  if (!_reviewsQueueEvents) {
    if (!redisUrl || !redisConnection) return null;
    
    _reviewsQueueEvents = new QueueEvents(REVIEWS_QUEUE_NAME, {
      connection: redisConnection,
    });

    _reviewsQueueEvents.on('completed', ({ jobId }) => {
      Logger.info(`[ReviewsQueue] Job ${jobId} completed ✅`);
    });

    _reviewsQueueEvents.on('failed', ({ jobId, failedReason }) => {
      Logger.error(`[ReviewsQueue] Job ${jobId} failed ❌: ${failedReason}`);
    });
  }
  return _reviewsQueueEvents;
};

// For backward compatibility while we refactor callers
export const reviewsQueue = getReviewsQueue();
export const reviewsQueueEvents = getReviewsQueueEvents();
export { redisConnection };
