import { Queue, QueueEvents } from 'bullmq';
import { Logger } from '../../../../core/Logger';

const redisUrl = new URL(process.env.REDIS_URL || 'redis://localhost:6379');
const connectionOpts = {
  host: redisUrl.hostname,
  port: Number(redisUrl.port || 6379),
  username: redisUrl.username || undefined,
  password: redisUrl.password || undefined,
  db: redisUrl.pathname.length > 1 ? Number(redisUrl.pathname.slice(1)) : undefined,
};

let appointmentQueue: Queue | null = null;
let queueEvents: QueueEvents | null = null;

try {
  appointmentQueue = new Queue('AppointmentAutomation', { 
    connection: connectionOpts,
    defaultJobOptions: {
      removeOnComplete: true,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    }
  });

  queueEvents = new QueueEvents('AppointmentAutomation', { connection: connectionOpts });

  queueEvents.on('completed', ({ jobId }) => {
    Logger.info(`[Queue] AppointmentAutomation Job ${jobId} completed.`);
  });

  queueEvents.on('failed', ({ jobId, failedReason }) => {
    Logger.error(`[Queue] AppointmentAutomation Job ${jobId} failed: ${failedReason}`);
  });
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  Logger.error(`[Queue] Failed to initialize AppointmentAutomation queue: ${errorMessage}`);
  if (process.env.NODE_ENV === 'production') {
    throw error;
  }
}

export { appointmentQueue, queueEvents };
