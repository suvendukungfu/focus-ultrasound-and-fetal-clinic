import { Queue, QueueEvents } from 'bullmq';
import { Logger } from '../../../../core/Logger';
import { getRedisConnectionOptions, getRedisUrl } from '../../../../core/cache/redisConfig';

const redisUrl = getRedisUrl();
const connectionOpts = getRedisConnectionOptions();

let appointmentQueue: Queue | null = null;
let queueEvents: QueueEvents | null = null;

if (redisUrl && connectionOpts) {
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
  }
} else {
  Logger.warn('[AppointmentQueue] Skipping initialization.');
}

export { appointmentQueue, queueEvents };
