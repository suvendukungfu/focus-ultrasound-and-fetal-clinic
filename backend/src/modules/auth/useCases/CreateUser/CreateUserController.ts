import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';
import { PrismaUsersRepository } from '../../repositories/implementations/PrismaUsersRepository';

const prismaUsersRepository = new PrismaUsersRepository();
const createUserUseCase = new CreateUserUseCase(prismaUsersRepository);

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, role } = request.body;

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      role,
    });

    return response.status(201).json(user);
  }
}
