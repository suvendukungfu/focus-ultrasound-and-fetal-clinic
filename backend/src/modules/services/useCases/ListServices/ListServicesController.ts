import { Request, Response } from 'express';
import { ListServicesUseCase } from './ListServicesUseCase';
import { PrismaServicesRepository } from '../../repositories/implementations/PrismaServicesRepository';

const prismaServicesRepository = new PrismaServicesRepository();
const listServicesUseCase = new ListServicesUseCase(prismaServicesRepository);

export class ListServicesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const services = await listServicesUseCase.execute();
    return response.json(services);
  }
}
