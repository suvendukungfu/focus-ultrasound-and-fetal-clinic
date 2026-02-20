import { Lead } from '@prisma/client';
import { ICreateLeadDTO } from '../../dtos/ICreateLeadDTO';
import { prisma } from '../../../../shared/infra/database/prismaClient';

export interface ILeadsRepository {
  create(data: ICreateLeadDTO): Promise<Lead>;
  list(): Promise<Lead[]>;
}

export class PrismaLeadsRepository implements ILeadsRepository {
  async create(data: ICreateLeadDTO): Promise<Lead> {
    const lead = await prisma.lead.create({
      data,
    });
    return lead;
  }

  async list(): Promise<Lead[]> {
    const leads = await prisma.lead.findMany();
    return leads;
  }
}
