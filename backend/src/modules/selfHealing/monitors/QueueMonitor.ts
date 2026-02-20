import { queueLeadProcessing } from '../../../core/queue/LeadQueue';
import { EventBus } from '../../../events/EventBus';
import { prisma } from '../../../shared/infra/database/prismaClient';
import { Logger } from '../../../core/Logger';

export class QueueMonitor {
  private checkIntervalMs = 15000; // Check every 15s

  start() {
    setInterval(async () => {
      try {
        const counts = await queueLeadProcessing.getJobCounts();
        
        // Log telemetry
        await prisma.systemMetric.create({
          data: {
            metricName: 'queueLoad',
            value: counts.active + counts.waiting,
            unit: 'jobs'
          }
        });

        // Trigger stalled event if metrics are critical
        if (counts.waiting > 1000) {
          Logger.warn(`[Monitor] Queue overloaded! Backlog: ${counts.waiting}`);
          EventBus.emit('queue.stalled', { payload: counts });
        }
      } catch (err) {
        Logger.error(`[QueueMonitor] Failed to read queue metrics`);
      }
    }, this.checkIntervalMs);
  }
}

export const queueMonitor = new QueueMonitor();
