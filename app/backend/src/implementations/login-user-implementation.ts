import LoginController from './express';
import LoginUser from '../use-cases/login-user';
import SequelizeUserReposiroty from './sequelize';
import JWTTokenHashing from './jwt';
import BCryptPasswordHashing from './bcrypt';

const jwtTokenHashing = new JWTTokenHashing();
const sequelizeUserReposiroty = new SequelizeUserReposiroty();
const bCryptPasswordHashing = new BCryptPasswordHashing();

const loginUserUseCase = new LoginUser(
  sequelizeUserReposiroty,
  jwtTokenHashing,
  bCryptPasswordHashing,
);

const loginUserController = new LoginController(loginUserUseCase);

export {
  loginUserController,
  loginUserUseCase,
};
