import { ICreateLeadDTO } from '../../dtos/ICreateLeadDTO';
import { PrismaLeadsRepository } from '../../repositories/implementations/PrismaLeadsRepository';
import { Logger } from '../../../../core/Logger';

// For WhatsApp integration or Email notifications later
// import { IMailProvider } from ...

export class CreateLeadUseCase {
  constructor(private leadsRepository: PrismaLeadsRepository) {}

  async execute(data: ICreateLeadDTO) {
    const lead = await this.leadsRepository.create(data);
    
    // TODO: Send WhatsApp notification
    // TODO: Send internal email alert
    Logger.info(`New Lead Created: ${lead.id} - ${lead.email}`);

    return lead;
  }
}
