import { Request, Response } from 'express';
import { CreateLeadUseCase } from './CreateLeadUseCase';
import { PrismaLeadsRepository } from '../../repositories/implementations/PrismaLeadsRepository';

// In a real app, use dependency injection
const prismaLeadsRepository = new PrismaLeadsRepository();
const createLeadUseCase = new CreateLeadUseCase(prismaLeadsRepository);

export class CreateLeadController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, phone, email, message, source, notes } = request.body;

    const lead = await createLeadUseCase.execute({
      name,
      phone,
      email,
      message,
      source,
      notes,
    });

    return response.status(201).json(lead);
  }
}
