import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { PrismaUsersRepository } from '../../repositories/implementations/PrismaUsersRepository';

const prismaUsersRepository = new PrismaUsersRepository();
const authenticateUserUseCase = new AuthenticateUserUseCase(prismaUsersRepository);

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const token = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.json(token);
  }
}
