import { Logger } from '../core/Logger';
import { prisma } from '../shared/infra/database/prismaClient';
import { EventBus } from '../events/EventBus';

export class EventGateway {
  private region: string;
  private isRunning: boolean = false;

  constructor(region: string) {
    this.region = region;
  }

  async start() {
    this.isRunning = true;
    Logger.info(`[EventGateway-${this.region}] Initializing Real-Time Streaming Gateway...`);
    
    // Subscribe to all kernel level events to broadcast them cross-region
    EventBus.on('kernel.*', async (payload: any) => {
      if (!this.isRunning) return;
      
      try {
        await prisma.kernelEvent.create({
          data: {
            eventType: payload.type || 'kernel.unknown',
            payload: payload.data || {},
            region: this.region
          }
        });
        Logger.debug(`[EventGateway] Replicated kernel event to central DB: ${payload.type}`);
      } catch (err) {
        Logger.error(`[EventGateway] Failed to sync kernel event: ${err}`);
      }
    });
  }

  async stop() {
    this.isRunning = false;
    Logger.info(`[EventGateway-${this.region}] Gateway shutting down...`);
  }
}
