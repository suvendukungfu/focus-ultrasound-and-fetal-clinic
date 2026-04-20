/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { AuthenticateUserUseCase } from '../../src/modules/auth/useCases/AuthenticateUser/AuthenticateUserUseCase';
import { AppError } from '../../src/core/AppError';
import bcrypt from 'bcrypt';

// Mock bcrypt.compare
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

// Mock jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mock-jwt-token-xyz'),
}));

describe('AuthenticateUserUseCase', () => {
  let useCase: AuthenticateUserUseCase;
  let mockUsersRepo: Record<string, jest.Mock>;

  const hashedPassword = '$2b$10$mockhashedpassword';

  const mockUser = {
    id: 'user-uuid-1',
    name: 'Admin User',
    email: 'admin@focus-clinic.com',
    password: hashedPassword,
    role: 'ADMIN',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockUsersRepo = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
    };
    useCase = new AuthenticateUserUseCase(mockUsersRepo);
    jest.clearAllMocks();
  });

  it('should authenticate a valid user and return a token', async () => {
    mockUsersRepo.findByEmail.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await useCase.execute({
      email: 'admin@focus-clinic.com',
      password: 'Admin@123!',
    });

    expect(result).toHaveProperty('user');
    expect(result).toHaveProperty('token');
    expect(result.user.email).toBe('admin@focus-clinic.com');
    expect(result.user.name).toBe('Admin User');
    expect(result.token).toBe('mock-jwt-token-xyz');
    expect(mockUsersRepo.findByEmail).toHaveBeenCalledWith('admin@focus-clinic.com');
  });

  it('should throw AppError when email does not exist', async () => {
    mockUsersRepo.findByEmail.mockResolvedValue(null);

    await expect(
      useCase.execute({
        email: 'nonexistent@test.com',
        password: 'anypassword',
      })
    ).rejects.toThrow('Email or password incorrect');

    expect(mockUsersRepo.findByEmail).toHaveBeenCalledWith('nonexistent@test.com');
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });

  it('should throw AppError when password does not match', async () => {
    mockUsersRepo.findByEmail.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      useCase.execute({
        email: 'admin@focus-clinic.com',
        password: 'WrongPassword!',
      })
    ).rejects.toThrow('Email or password incorrect');

    expect(bcrypt.compare).toHaveBeenCalledWith('WrongPassword!', hashedPassword);
  });

  it('should not leak user password in response', async () => {
    mockUsersRepo.findByEmail.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await useCase.execute({
      email: 'admin@focus-clinic.com',
      password: 'Admin@123!',
    });

    expect(result.user).not.toHaveProperty('password');
    expect(result.user).not.toHaveProperty('id');
  });
});
