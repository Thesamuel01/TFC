import { ExpressGetTeamsController } from './express';
import { GetTeams } from '../use-cases';
import { SequelizeTeamRpository } from './sequelize';

const sequelizeUserReposiroty = new SequelizeTeamRpository();

const getTeamsUseCase = new GetTeams(
  sequelizeUserReposiroty,
);

const getTeamsImplementation = new ExpressGetTeamsController(getTeamsUseCase);

export {
  getTeamsImplementation,
  getTeamsUseCase,
};
