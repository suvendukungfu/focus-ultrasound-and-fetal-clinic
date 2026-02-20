import { Service } from '@prisma/client';
import { ICreateServiceDTO } from '../../dtos/ICreateServiceDTO';
import { IServicesRepository } from '../IServicesRepository';
import { prisma } from '../../../../shared/infra/database/prismaClient';

export class PrismaServicesRepository implements IServicesRepository {
  async create(data: ICreateServiceDTO): Promise<Service> {
    const service = await prisma.service.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        durationMin: data.durationMin,
        isActive: data.isActive,
      },
    });
    return service;
  }

  async list(): Promise<Service[]> {
    const services = await prisma.service.findMany();
    return services;
  }

  async findById(id: string): Promise<Service | null> {
    const service = await prisma.service.findUnique({
      where: { id },
    });
    return service;
  }

  async delete(id: string): Promise<void> {
    await prisma.service.delete({
      where: { id },
    });
  }
}
