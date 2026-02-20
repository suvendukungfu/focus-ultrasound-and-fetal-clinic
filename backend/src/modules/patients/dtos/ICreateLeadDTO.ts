import { LeadStatus } from '@prisma/client';

export interface ICreateLeadDTO {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  source?: string;
  status?: LeadStatus;
  notes?: string;
}
