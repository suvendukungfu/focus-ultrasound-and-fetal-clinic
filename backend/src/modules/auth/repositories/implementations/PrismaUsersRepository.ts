import { prisma } from '../../../../shared/infra/database/prismaClient';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '@prisma/client';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}

export class PrismaUsersRepository implements IUsersRepository {
  async create({ name, email, password, role }: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }
}
