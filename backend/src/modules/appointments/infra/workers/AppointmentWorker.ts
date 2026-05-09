import { Worker } from 'bullmq';
import { Logger } from '../../../../core/Logger';
import { whatsappService } from '../../../integrations/whatsapp/services/WhatsAppService';

let connectionOpts: Record<string, unknown> | null = null;

if (process.env.REDIS_URL) {
  const redisUrl = new URL(process.env.REDIS_URL);
  connectionOpts = {
    host: redisUrl.hostname,
    port: Number(redisUrl.port || 6379),
    username: redisUrl.username || undefined,
    password: redisUrl.password || undefined,
    db: redisUrl.pathname.length > 1 ? Number(redisUrl.pathname.slice(1)) : undefined,
  };
}

let appointmentWorker: Worker | null = null;

if (process.env.REDIS_URL && connectionOpts) {
  try {
    appointmentWorker = new Worker('AppointmentAutomation', async job => {
      const { phone, name, date, type } = job.data;
      
      try {
        if (type === 'confirmation') {
          const message = `Hello ${name}! 🌟 Your appointment at Focus Ultrasound and Fetal Clinic is confirmed for ${new Date(date).toLocaleString()}. See you soon!`;
          await whatsappService.sendMessage(phone, message);
          Logger.info(`[Worker] Sent confirmation to ${phone}`);
        }

        if (type === 'reminder') {
          const message = `Reminder: Hello ${name}, you have an appointment tomorrow (${new Date(date).toLocaleDateString()}) at Focus Ultrasound and Fetal Clinic. 🏥`;
          await whatsappService.sendMessage(phone, message);
          Logger.info(`[Worker] Sent reminder to ${phone}`);
        }
      } catch (error) {
        Logger.error(`[Worker] AppointmentAutomation Job ${job.id} failed: ${error}`);
        throw error;
      }
    }, { connection: connectionOpts });
  } catch (error) {
    const initErrorMessage = error instanceof Error ? error.message : String(error);
    Logger.error(`[Worker] Failed to initialize AppointmentAutomation worker: ${initErrorMessage}`);
  }
} else {
  Logger.warn('[AppointmentWorker] Skipping initialization (no REDIS_URL provided).');
}

export { appointmentWorker };
