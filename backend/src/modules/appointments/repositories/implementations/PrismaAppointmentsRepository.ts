import { prisma } from '../../../../shared/infra/database/prismaClient';
import { Appointment, AppointmentStatus } from '@prisma/client';
import { IAppointmentsRepository } from '../IAppointmentsRepository';
import { ICreateAppointmentDTO } from '../../dtos/ICreateAppointmentDTO';

export class PrismaAppointmentsRepository implements IAppointmentsRepository {
  async create(data: ICreateAppointmentDTO): Promise<Appointment> {
    const isUUID = (str: string) => {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      return uuidRegex.test(str);
    };

    const finalServiceId = data.serviceId && isUUID(data.serviceId) ? data.serviceId : null;
    const finalDoctorId = data.doctorId && isUUID(data.doctorId) ? data.doctorId : null;
    
    let additionalNotes = '';
    if (data.serviceId && !isUUID(data.serviceId)) {
      additionalNotes += `\nSelected Service: ${data.serviceId}`;
    }
    if (data.doctorId && !isUUID(data.doctorId)) {
      additionalNotes += `\nSelected Doctor: ${data.doctorId}`;
    }

    const appointment = await prisma.appointment.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        serviceId: finalServiceId,
        doctorId: finalDoctorId,
        date: data.date,
        notes: (data.notes || '') + additionalNotes,
        status: 'PENDING' as AppointmentStatus,
      },
    });

    return appointment;
  }

  async listAll(): Promise<Appointment[]> {
    return prisma.appointment.findMany({
      where: {
        deletedAt: null,
      },
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
      data: {
        status: status as AppointmentStatus,
      },
    });
  }
}
