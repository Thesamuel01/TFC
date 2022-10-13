import { ExpressGetLeaderBoardController } from './express';
import { GetLeaderBoard } from '../use-cases';
import { SequelizeMatchReposiroty, SequelizeTeamRpository } from './sequelize';

const sequelizeMatchReposiroty = new SequelizeMatchReposiroty();
const sequelizeUserReposiroty = new SequelizeTeamRpository();

const getLeaderBoardUseCase = new GetLeaderBoard(
  sequelizeMatchReposiroty,
  sequelizeUserReposiroty,
);

const getLeaderBoardImplementation = new ExpressGetLeaderBoardController(getLeaderBoardUseCase);

export {
  getLeaderBoardImplementation,
  getLeaderBoardUseCase,
};
