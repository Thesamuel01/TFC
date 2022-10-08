import { ExpressGetMatchesController } from './express';
import { GetMatches } from '../use-cases';
import { SequelizeMatchReposiroty } from './sequelize';

const sequelizeMatchReposiroty = new SequelizeMatchReposiroty();

const getMatchesUseCase = new GetMatches(
  sequelizeMatchReposiroty,
);

const getMatchesImplementation = new ExpressGetMatchesController(getMatchesUseCase);

export {
  getMatchesImplementation,
  getMatchesUseCase,
};
