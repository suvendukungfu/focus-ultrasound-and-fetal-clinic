import { Request, Response } from 'express';
import { CreateAppointmentUseCase } from './CreateAppointmentUseCase';
import { PrismaAppointmentsRepository } from '../../repositories/implementations/PrismaAppointmentsRepository';

const appointmentsRepository = new PrismaAppointmentsRepository();
const createAppointmentUseCase = new CreateAppointmentUseCase(appointmentsRepository);

export class CreateAppointmentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, phone, serviceId, doctorId, date, notes, email } = request.body;

    try {
      const appointment = await createAppointmentUseCase.execute({
        name,
        phone,
        serviceId,
        doctorId,
        date: new Date(date),
        notes,
        email,
      });

      return response.status(201).json(appointment);
    } catch (error) {
      console.error('Error creating appointment:', error);
      return response.status(400).json({
        message: error instanceof Error ? error.message : 'Error creating appointment',
      });
    }
  }
}
