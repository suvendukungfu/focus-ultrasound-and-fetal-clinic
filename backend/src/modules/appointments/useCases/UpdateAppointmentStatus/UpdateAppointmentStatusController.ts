import { Request, Response } from 'express';
import { PrismaAppointmentsRepository } from '../../repositories/implementations/PrismaAppointmentsRepository';
import { UpdateAppointmentStatusUseCase } from './UpdateAppointmentStatusUseCase';

export class UpdateAppointmentStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { status } = request.body;

    const appointmentsRepository = new PrismaAppointmentsRepository();
    const updateAppointmentStatusUseCase = new UpdateAppointmentStatusUseCase(appointmentsRepository);

    try {
      const appointment = await updateAppointmentStatusUseCase.execute(id, status);
      return response.json(appointment);
    } catch (error) {
      return response.status(400).json({ 
        message: error instanceof Error ? error.message : 'Unexpected error' 
      });
    }
  }
}
