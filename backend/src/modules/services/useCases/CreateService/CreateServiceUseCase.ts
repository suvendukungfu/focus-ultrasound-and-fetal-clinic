import { ICreateServiceDTO } from '../../dtos/ICreateServiceDTO';
import { IServicesRepository } from '../../repositories/IServicesRepository';

export class CreateServiceUseCase {
  constructor(private servicesRepository: IServicesRepository) {}

  async execute(data: ICreateServiceDTO) {
    const service = await this.servicesRepository.create(data);
    return service;
  }
}
