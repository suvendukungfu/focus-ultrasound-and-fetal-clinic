import { Queue, Worker, QueueEvents } from 'bullmq';
import { Logger } from '../Logger';
import { getRedisConnectionOptions, getRedisUrl } from '../cache/redisConfig';

const redisUrl = getRedisUrl();
const connectionOpts = getRedisConnectionOptions();

export const queueLeadProcessing = (!redisUrl || !connectionOpts)
  ? null as Queue | null
  : new Queue('LeadProcessing', { connection: connectionOpts });

export let worker: Worker | null = null;

if (redisUrl && connectionOpts) {
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
  Logger.warn('[LeadQueue] Skipping LeadProcessing initialization. Background jobs will be disabled.');
}
