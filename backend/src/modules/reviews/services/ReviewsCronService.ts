/**
 * ReviewsCronService
 * ------------------
 * Schedules repeatable BullMQ cron jobs for the reviews pipeline.
 *
 * Schedule overview:
 *  ┌─────────────────────────────┬────────────────────────────────────┐
 *  │ Job                         │ Cron / Interval                    │
 *  ├─────────────────────────────┼────────────────────────────────────┤
 *  │ fetch-google-reviews        │ Every 6 hours  (0 * /6 * * *)     │
 *  │ rotate-testimonials         │ Every 1 hour   (0 * * * *)         │
 *  └─────────────────────────────┴────────────────────────────────────┘
 *
 * Follows the Micro-Kernel plugin pattern — exports a MicroPlugin so it can
 * be registered with Kernel.registry.register() in server.ts.
 */
import { Logger } from '../../../core/Logger';
import { reviewsQueue } from '../queues/ReviewsQueue';
// Import worker so it is instantiated (side-effect: starts listening)
import '../workers/ReviewsWorker';

const GOOGLE_FETCH_CRON = '0 */6 * * *'; // every 6 hours
const ROTATION_CRON = '0 * * * *';       // every 1 hour

export const reviewsCronService = {
  name: 'ReviewsCronService',

  async init() {
    Logger.info('[ReviewsCronService] Initialising repeatable jobs...');

    // Remove any stale repeatable jobs from a previous deployment
    const existing = await reviewsQueue.getRepeatableJobs();
    for (const job of existing) {
      await reviewsQueue.removeRepeatableByKey(job.key);
      Logger.info(`[ReviewsCronService] Removed stale job: ${job.name}`);
    }
  },

  async start() {
    // Schedule: fetch Google reviews every 6 hours
    await reviewsQueue.add(
      'fetch-google-reviews',
      {},
      {
        repeat: { pattern: GOOGLE_FETCH_CRON, tz: 'Asia/Kolkata' },
        jobId: 'cron:fetch-google-reviews',
      }
    );
    Logger.info(`[ReviewsCronService] Scheduled "fetch-google-reviews" → ${GOOGLE_FETCH_CRON} IST`);

    // Schedule: rotate testimonial cache every hour
    await reviewsQueue.add(
      'rotate-testimonials',
      {},
      {
        repeat: { pattern: ROTATION_CRON, tz: 'Asia/Kolkata' },
        jobId: 'cron:rotate-testimonials',
      }
    );
    Logger.info(`[ReviewsCronService] Scheduled "rotate-testimonials" → ${ROTATION_CRON} IST`);

    // Also trigger rotate-testimonials immediately on boot
    // so the cache is warm before the first cron tick
    await reviewsQueue.add('rotate-testimonials', {}, { jobId: 'boot:rotate-testimonials' });
    Logger.info('[ReviewsCronService] Queued immediate boot rotation.');
  },

  async stop() {
    await reviewsQueue.close();
    Logger.info('[ReviewsCronService] Queue closed.');
  },

  async health() {
    const counts = await reviewsQueue.getJobCounts();
    const status: 'ONLINE' | 'DEGRADED' = counts.failed > 10 ? 'DEGRADED' : 'ONLINE';
    return { status, metrics: { counts } };
  },
};
