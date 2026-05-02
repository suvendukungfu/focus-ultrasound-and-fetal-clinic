import { Appointment } from '@prisma/client';
import { ICreateAppointmentDTO } from '../dtos/ICreateAppointmentDTO';

export interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  listAll(): Promise<Appointment[]>;
  findById(id: string): Promise<Appointment | null>;
  updateStatus(id: string, status: string): Promise<Appointment>;
}
