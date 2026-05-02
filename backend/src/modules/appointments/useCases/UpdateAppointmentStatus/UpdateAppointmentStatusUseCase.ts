import { IAppointmentsRepository } from '../../repositories/IAppointmentsRepository';
import { Appointment } from '@prisma/client';

export class UpdateAppointmentStatusUseCase {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  async execute(id: string, status: string): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findById(id);

    if (!appointment) {
      throw new Error('Appointment not found');
    }

    return this.appointmentsRepository.updateStatus(id, status);
  }
}
