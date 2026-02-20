import { PrismaLeadsRepository } from '../../repositories/implementations/PrismaLeadsRepository';

export class ListLeadsUseCase {
  constructor(private leadsRepository: PrismaLeadsRepository) {}

  async execute() {
    const leads = await this.leadsRepository.list();
    return leads;
  }
}
