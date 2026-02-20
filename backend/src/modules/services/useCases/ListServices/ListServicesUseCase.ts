import { IServicesRepository } from '../../repositories/IServicesRepository';

export class ListServicesUseCase {
  constructor(private servicesRepository: IServicesRepository) {}

  async execute() {
    const services = await this.servicesRepository.list();
    return services;
  }
}
