import { Queue, Worker, QueueEvents } from 'bullmq';
import { Logger } from '../Logger';

const connectionOpts = { host: 'localhost', port: 6379 };

export const queueLeadProcessing = new Queue('LeadProcessing', { 
  connection: connectionOpts 
});

const queueEvents = new QueueEvents('LeadProcessing', { connection: connectionOpts });

queueEvents.on('completed', ({ jobId }) => {
  Logger.info(`[Queue] LeadProcessing Job ${jobId} successfully completed.`);
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
  Logger.error(`[Queue] LeadProcessing Job ${jobId} failed: ${failedReason}`);
});

export const worker = new Worker('LeadProcessing', async job => {
  if (job.name === 'process-new-lead') {
    const { email, name } = job.data;
    Logger.info(`[Worker] Started processing new lead via AI Scoring: ${name} (${email})`);
    
    // Simulate heavy async job (sending emails, scoring)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return { success: true, aiScore: 85 };
  }
}, { connection: connectionOpts });
