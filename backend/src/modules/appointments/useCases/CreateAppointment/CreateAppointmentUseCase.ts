import { IAppointmentsRepository } from '../../repositories/IAppointmentsRepository';
import { ICreateAppointmentDTO } from '../../dtos/ICreateAppointmentDTO';
import { Appointment } from '@prisma/client';
import { appointmentQueue } from '../../infra/queue/AppointmentQueue';

export class CreateAppointmentUseCase {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  async execute(data: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.create(data);

    // 1. Send Immediate Confirmation via BullMQ
    if (appointmentQueue) {
      // Normalize phone for WhatsApp (no +, only numbers)
      const normalizedPhone = appointment.phone.replace(/[^0-9]/g, '');
      
      await appointmentQueue.add('send-confirmation', {
        type: 'confirmation',
        phone: normalizedPhone,
        name: appointment.name,
        date: appointment.date,
      });

      // 2. Schedule Reminder (24 hours before)
      const appointmentTime = new Date(appointment.date).getTime();
      const reminderTime = appointmentTime - (24 * 60 * 60 * 1000); // 24 hours before
      const delay = reminderTime - Date.now();

      if (delay > 0) {
        await appointmentQueue.add('send-reminder', {
          type: 'reminder',
          phone: normalizedPhone,
          name: appointment.name,
          date: appointment.date,
        }, { delay });
      }
    } else {
      console.warn('[Queue] Skipping confirmation/reminder as appointmentQueue is not initialized.');
    }

    return appointment;
  }
}
