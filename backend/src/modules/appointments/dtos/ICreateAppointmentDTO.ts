export interface ICreateAppointmentDTO {
  name: string;
  phone: string;
  service: string;
  date: Date;
  message?: string;
}
