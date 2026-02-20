import { ICreateLeadDTO } from '../../dtos/ICreateLeadDTO';
import { PrismaLeadsRepository } from '../../repositories/implementations/PrismaLeadsRepository';
import { Logger } from '../../../../core/Logger';
import { EventBus } from '../../../../events/EventBus';

// For WhatsApp integration or Email notifications later
// import { IMailProvider } from ...

export class CreateLeadUseCase {
  constructor(private leadsRepository: PrismaLeadsRepository) {}

  async execute(data: ICreateLeadDTO) {
    const lead = await this.leadsRepository.create(data);
    
    // Asynchronous Lead Scoring & Notifications
    EventBus.emit('lead.created', lead);
    
    // TODO: Send WhatsApp notification
    // TODO: Send internal email alert
    Logger.info(`New Lead Created: ${lead.id} - ${lead.email}`);

    return lead;
  }
}
