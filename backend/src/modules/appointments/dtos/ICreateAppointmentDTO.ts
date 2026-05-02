export interface ICreateAppointmentDTO {
  name: string;
  phone: string;
  serviceId?: string;
  doctorId?: string;
  date: Date;
  notes?: string;
  email?: string;
}
