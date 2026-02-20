import { Router } from 'express';
import { CreateUserController } from '../../../useCases/CreateUser/CreateUserController';
import { AuthenticateUserController } from '../../../useCases/AuthenticateUser/AuthenticateUserController';

const authRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

authRoutes.post('/register', createUserController.handle);
authRoutes.post('/login', authenticateUserController.handle);

export { authRoutes };
