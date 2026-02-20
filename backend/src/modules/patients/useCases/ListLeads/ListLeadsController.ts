import { Request, Response } from 'express';
import { ListLeadsUseCase } from './ListLeadsUseCase';
import { PrismaLeadsRepository } from '../../repositories/implementations/PrismaLeadsRepository';

// In a real app, use dependency injection
const prismaLeadsRepository = new PrismaLeadsRepository();
const listLeadsUseCase = new ListLeadsUseCase(prismaLeadsRepository);

export class ListLeadsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const leads = await listLeadsUseCase.execute();
    return response.json(leads);
  }
}
