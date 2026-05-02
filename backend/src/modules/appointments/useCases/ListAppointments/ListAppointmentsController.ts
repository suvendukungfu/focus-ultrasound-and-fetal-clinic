import { Request, Response } from 'express';
import { ListAppointmentsUseCase } from './ListAppointmentsUseCase';
import { PrismaAppointmentsRepository } from '../../repositories/implementations/PrismaAppointmentsRepository';

const appointmentsRepository = new PrismaAppointmentsRepository();
const listAppointmentsUseCase = new ListAppointmentsUseCase(appointmentsRepository);

export class ListAppointmentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const appointments = await listAppointmentsUseCase.execute();
      return response.json(appointments);
    } catch (error) {
      console.error('Error listing appointments:', error);
      return response.status(400).json({
        message: error instanceof Error ? error.message : 'Error listing appointments',
      });
    }
  }
}
