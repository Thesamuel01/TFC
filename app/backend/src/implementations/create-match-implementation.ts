import { ExpressCreateMatchController } from './express';
import { CreateMatch } from '../use-cases';
import { SequelizeMatchReposiroty, SequelizeTeamRpository } from './sequelize';

const sequelizeMatchReposiroty = new SequelizeMatchReposiroty();
const sequelizeTeamReposiroty = new SequelizeTeamRpository();

const createMatchUseCase = new CreateMatch(
  sequelizeMatchReposiroty,
  sequelizeTeamReposiroty,
);

const createMatchImplementation = new ExpressCreateMatchController(
  createMatchUseCase,
);

export {
  createMatchImplementation,
  createMatchUseCase,
};
