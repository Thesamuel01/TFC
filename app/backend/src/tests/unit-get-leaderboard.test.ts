import * as sinon from 'sinon';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { GetLeaderBoard } from '../use-cases';
import { InMemoryMatchRepository, InMemoryTeamRepository } from '../repositories/in-memory'
import { awayLeaderBoard, homeLeaderBoard, leaderboards } from './mocks/leaderboard-mock';

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Get leaderboard use case', () => {
  let getLeaderBoardUseCase: GetLeaderBoard;

  before(() => {
    const matchRepository = new InMemoryMatchRepository();
    const teamRepository = new InMemoryTeamRepository();

    getLeaderBoardUseCase = new GetLeaderBoard(matchRepository, teamRepository);
  });

  describe('execute', () => {
    it('should return a, ordered general leaderboard array when is not receveid any param', async () => {
      const sut = await getLeaderBoardUseCase.execute();
      
      expect(sut).to.be.an('array');
      expect(sut).to.be.eql(leaderboards);
    });

    it('should return an ordered away team leaderboard array', async () => {
      const sut = await getLeaderBoardUseCase.execute('away');
      
      expect(sut).to.be.an('array');
      expect(sut).to.be.eql(awayLeaderBoard);
    });

    it('should return an ordered home team leaderboard array', async () => {
      const sut = await getLeaderBoardUseCase.execute('home');
      
      expect(sut).to.be.an('array');
      expect(sut).to.be.eql(homeLeaderBoard);
    });
  });
})