import { Queue, Worker, QueueEvents } from 'bullmq';
import { Logger } from '../Logger';

const redisUrl = new URL(process.env.REDIS_URL || 'redis://localhost:6379');
const connectionOpts = {
  host: redisUrl.hostname,
  port: Number(redisUrl.port || 6379),
  username: redisUrl.username || undefined,
  password: redisUrl.password || undefined,
  db: redisUrl.pathname.length > 1 ? Number(redisUrl.pathname.slice(1)) : undefined,
};

export const queueLeadProcessing = (process.env.NODE_ENV === 'development' && !process.env.REDIS_URL)
  ? null as Queue | null
  : new Queue('LeadProcessing', { connection: connectionOpts });

export let worker: Worker | null = null;

if (process.env.NODE_ENV !== 'development' || process.env.REDIS_URL) {
  const queueEvents = new QueueEvents('LeadProcessing', { connection: connectionOpts });

  queueEvents.on('completed', ({ jobId }) => {
    Logger.info(`[Queue] LeadProcessing Job ${jobId} successfully completed.`);
  });

  queueEvents.on('failed', ({ jobId, failedReason }) => {
    Logger.error(`[Queue] LeadProcessing Job ${jobId} failed: ${failedReason}`);
  });

  worker = new Worker('LeadProcessing', async job => {
    if (job.name === 'process-new-lead') {
      const { email, name } = job.data;
      Logger.info(`[Worker] Started processing new lead via AI Scoring: ${name} (${email})`);
      
      // Simulate heavy async job (sending emails, scoring)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return { success: true, aiScore: 85 };
    }
  }, { connection: connectionOpts });
} else {
  Logger.warn('[LeadQueue] Skipping LeadProcessing worker initialization in development (no REDIS_URL)');
}
