import { ExpressAuthController } from './express';
import { loginUserUseCase } from './login-user-implementation';

const authControllerImplementation = new ExpressAuthController(
  loginUserUseCase,
);

export default authControllerImplementation;
