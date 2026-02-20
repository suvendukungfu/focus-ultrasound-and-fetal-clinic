import { Service } from '@prisma/client';
import { ICreateServiceDTO } from '../dtos/ICreateServiceDTO';

export interface IServicesRepository {
  create(data: ICreateServiceDTO): Promise<Service>;
  list(): Promise<Service[]>;
  findById(id: string): Promise<Service | null>;
  delete(id: string): Promise<void>;
}
