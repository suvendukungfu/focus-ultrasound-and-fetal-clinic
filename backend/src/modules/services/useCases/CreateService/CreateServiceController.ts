import { Request, Response } from 'express';
import { CreateServiceUseCase } from './CreateServiceUseCase';
import { PrismaServicesRepository } from '../../repositories/implementations/PrismaServicesRepository';

const prismaServicesRepository = new PrismaServicesRepository();
const createServiceUseCase = new CreateServiceUseCase(prismaServicesRepository);

export class CreateServiceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, price, durationMin, isActive } = request.body;

    const service = await createServiceUseCase.execute({
      name,
      description,
      price,
      durationMin,
      isActive,
    });

    return response.status(201).json(service);
  }
}
