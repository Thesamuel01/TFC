import { ExpressLoginController } from './express';
import { LoginUser } from '../use-cases';
import { SequelizeUserReposiroty } from './sequelize';
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

const loginUserImplementation = new ExpressLoginController(loginUserUseCase);

export {
  loginUserImplementation,
  loginUserUseCase,
};
