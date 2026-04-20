export interface ICreateLeadDTO {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  source?: string;
  status?: string;
  notes?: string;
}
