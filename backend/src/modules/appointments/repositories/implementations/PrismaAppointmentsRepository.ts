import { prisma } from '../../../../shared/infra/database/prismaClient';
import { Appointment } from '@prisma/client';
import { IAppointmentsRepository } from '../IAppointmentsRepository';
import { ICreateAppointmentDTO } from '../../dtos/ICreateAppointmentDTO';

export class PrismaAppointmentsRepository implements IAppointmentsRepository {
  async create(data: ICreateAppointmentDTO): Promise<Appointment> {
    // Look up service by name to get its ID
    const service = await prisma.service.findFirst({
      where: {
        name: {
          contains: data.service,
        },
      },
    });

    const appointment = await prisma.appointment.create({
      data: {
        name: data.name,
        phone: data.phone,
        date: data.date,
        notes: data.message || '',
        status: 'PENDING',
        ...(service ? { serviceId: service.id } : {}),
      },
      include: {
        service: true,
      },
    });

    return appointment;
  }

  async listAll(): Promise<Appointment[]> {
    return prisma.appointment.findMany({
      orderBy: {
        date: 'desc',
      },
      include: {
        service: true,
      },
    });
  }

  async findById(id: string): Promise<Appointment | null> {
    return prisma.appointment.findUnique({
      where: { id },
    });
  }

  async updateStatus(id: string, status: string): Promise<Appointment> {
    return prisma.appointment.update({
      where: { id },
      data: { status: status.toUpperCase() },
    });
  }
}
