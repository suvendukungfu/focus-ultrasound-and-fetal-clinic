import { Logger } from '../../../core/Logger';
import { appointmentQueue } from '../infra/queue/AppointmentQueue';
// Import worker to start listening
import '../infra/workers/AppointmentWorker';

export const appointmentAutomationService = {
  name: 'AppointmentAutomationService',

  async init() {
    Logger.info('[AppointmentAutomationService] Initialising queue listeners...');
  },

  async start() {
    Logger.info('[AppointmentAutomationService] Worker started and listening for appointment jobs.');
  },

  async stop() {
    if (appointmentQueue) {
      await appointmentQueue.close();
    }
    Logger.info('[AppointmentAutomationService] Queue closed.');
  },

  async health(): Promise<{ status: 'ONLINE' | 'DEGRADED' | 'OFFLINE'; metrics?: Record<string, unknown> }> {
    if (!appointmentQueue) {
      return { status: 'OFFLINE' };
    }
    const counts = await appointmentQueue.getJobCounts();
    const status: 'DEGRADED' | 'ONLINE' = counts.failed > 20 ? 'DEGRADED' : 'ONLINE';
    return { status, metrics: { counts } };
  },
};
