import { Request, Response } from 'express';
import { CreateAppointmentUseCase } from './CreateAppointmentUseCase';
import { PrismaAppointmentsRepository } from '../../repositories/implementations/PrismaAppointmentsRepository';
import { z } from 'zod';

const appointmentsRepository = new PrismaAppointmentsRepository();
const createAppointmentUseCase = new CreateAppointmentUseCase(appointmentsRepository);

const appointmentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
  service: z.string().min(1, 'Service is required'),
  date: z.string().or(z.date()),
  message: z.string().optional(),
});

export class CreateAppointmentController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const validatedData = appointmentSchema.parse(request.body);

      const appointment = await createAppointmentUseCase.execute({
        name: validatedData.name,
        phone: validatedData.phone,
        service: validatedData.service,
        date: new Date(validatedData.date),
        message: validatedData.message,
      });

      // Map the returned Prisma object (which includes the service relation) to the notification format
      interface AppointmentWithService {
        name: string;
        phone: string;
        date: Date;
        notes: string | null;
        service?: { name: string };
      }

      const appointmentWithExtras = appointment as unknown as AppointmentWithService;
      const serviceName = appointmentWithExtras.service?.name || validatedData.service;

      const messageText = `New Appointment Request:
Name: ${appointmentWithExtras.name}
Phone: ${appointmentWithExtras.phone}
Service: ${serviceName}
Date: ${new Date(appointmentWithExtras.date).toLocaleString()}
Message: ${appointmentWithExtras.notes || 'N/A'}`;

      const whatsappUrl = `https://wa.me/919870475400?text=${encodeURIComponent(messageText)}`;

      return response.status(201).json({
        success: true,
        appointment,
        whatsappUrl,
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
      if (error instanceof z.ZodError) {
        return response.status(400).json({ message: 'Validation error', errors: error.errors });
      }
      return response.status(400).json({
        message: error instanceof Error ? error.message : 'Error creating appointment',
      });
    }
  }
}
