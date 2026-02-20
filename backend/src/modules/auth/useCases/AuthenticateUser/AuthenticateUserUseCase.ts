import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { IUsersRepository } from '../../repositories/implementations/PrismaUsersRepository';
import { AppError } from '../../../../core/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign(
      {
        role: user.role,
      },
      process.env.JWT_SECRET || 'default_secret',
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
