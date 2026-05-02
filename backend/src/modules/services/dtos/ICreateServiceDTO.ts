import { Prisma } from '@prisma/client';

export interface ICreateServiceDTO {
  name: string;
  description?: string;
  price?: Prisma.Decimal | number | string | null;
  durationMin?: number;
  isActive?: boolean;
}
