import EventEmitter from 'events';
import { Logger } from '../core/Logger';
import { queueLeadProcessing } from '../core/queue/LeadQueue';

class AppEventBus extends EventEmitter {
  constructor() {
    super();
    this.registerHandlers();
  }

  private registerHandlers() {
    // Fire-and-forget background job triggers
    this.on('lead.created', async (leadData) => {
      Logger.info(`[Event] lead.created fired for ${leadData.email}`);
      // Push to BullMQ queue for async processing without blocking the API response
      await queueLeadProcessing.add('process-new-lead', leadData, {
        attempts: 3,
        backoff: { type: 'exponential', delay: 1000 }
      });
    });

    this.on('user.logged_in', (userData) => {
      Logger.info(`[Event] user.logged_in fired for ${userData.id}`);
      // Send login alert, track metrics, etc
    });
  }
}

export const EventBus = new AppEventBus();
