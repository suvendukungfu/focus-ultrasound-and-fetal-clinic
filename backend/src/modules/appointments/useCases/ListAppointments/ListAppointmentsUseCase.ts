import { IAppointmentsRepository } from '../../repositories/IAppointmentsRepository';
import { Appointment } from '@prisma/client';

export class ListAppointmentsUseCase {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  async execute(): Promise<Appointment[]> {
    return this.appointmentsRepository.listAll();
  }
}
