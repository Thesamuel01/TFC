import { ExpressUpdateMatchController } from './express';
import { UpdateMatch } from '../use-cases';
import { SequelizeMatchReposiroty } from './sequelize';

const sequelizeMatchReposiroty = new SequelizeMatchReposiroty();

const updateMatchUseCase = new UpdateMatch(
  sequelizeMatchReposiroty,
);

const updateMatchImplementation = new ExpressUpdateMatchController(
  updateMatchUseCase,
);

export {
  updateMatchImplementation,
  updateMatchUseCase,
};
