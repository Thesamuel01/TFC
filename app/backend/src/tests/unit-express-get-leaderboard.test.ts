import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';

import { ExpressGetLeaderBoardController } from '../implementations/express';
import { GetLeaderBoard } from '../use-cases';
import { InMemoryMatchRepository, InMemoryTeamRepository } from '../repositories/in-memory'
import { awayLeaderBoard, homeLeaderBoard, leaderboards } from './mocks/leaderboard-mock';
import testController from './helpers/controllerTest';

const { expect } = chai;
chai.use(sinonChai);

describe('Express get matches controller implementation', () => {
  describe('handle', () => {
    let stub: sinon.SinonStub;
    let inMemoryMatchRepository: InMemoryMatchRepository;
    let inMemoryTeamRepository: InMemoryTeamRepository;
    let getLeaderBoardUseCase: GetLeaderBoard;
    
    beforeEach(() => {
      inMemoryMatchRepository = new InMemoryMatchRepository();
      inMemoryTeamRepository = new InMemoryTeamRepository();

      getLeaderBoardUseCase = new GetLeaderBoard(inMemoryMatchRepository, inMemoryTeamRepository);

      stub = sinon.stub(getLeaderBoardUseCase, 'execute');
    });

    afterEach(() => stub.restore());

    it('should return status code 200 and an array with leaderboard infos when there is no filter in url', async () => {
      stub.resolves(leaderboards);

      const sut = new ExpressGetLeaderBoardController(getLeaderBoardUseCase);
      const result = await testController(sut.handle);      

      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.a('array');
      expect(result.body[0]).to.have.property('name', 'Corinthians');
      expect(result.body[0]).to.have.property('totalPoints', 3);
      expect(result.body[0]).to.have.property('totalGames', 1);
      expect(result.body[0]).to.have.property('totalVictories', 1);
      expect(result.body[0]).to.have.property('totalDraws', 0);
      expect(result.body[0]).to.have.property('totalLosses', 0);
      expect(result.body[0]).to.have.property('goalsFavor', 2);
      expect(result.body[0]).to.have.property('goalsOwn', 0);
      expect(result.body[0]).to.have.property('goalsBalance', 2);
      expect(result.body[0]).to.have.property('efficiency', '100.00');
    });

    it('should return status code 200 and an array with away teams leaderboard', async () => {
      stub.resolves(awayLeaderBoard);

      const sut = new ExpressGetLeaderBoardController(getLeaderBoardUseCase);
      const url = '/leaderboard/away';
      const result = await testController(sut.handle, { url });

      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.a('array');
      expect(result.body[0]).to.have.property('name', 'Grêmio');
      expect(result.body[0]).to.have.property('totalPoints', 1);
      expect(result.body[0]).to.have.property('totalGames', 1);
      expect(result.body[0]).to.have.property('totalVictories', 0);
      expect(result.body[0]).to.have.property('totalDraws', 1);
      expect(result.body[0]).to.have.property('totalLosses', 0);
      expect(result.body[0]).to.have.property('goalsFavor', 1);
      expect(result.body[0]).to.have.property('goalsOwn', 1);
      expect(result.body[0]).to.have.property('goalsBalance', 0);
      expect(result.body[0]).to.have.property('efficiency', '33.33');
    });

    it('should return status code 200 and an array with home teams leaderboard', async () => {
      stub.resolves(homeLeaderBoard)

      const sut = new ExpressGetLeaderBoardController(getLeaderBoardUseCase);
      const url = '/leaderboard/home';
      const result = await testController(sut.handle, { url });

      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.a('array');
      expect(result.body[0]).to.have.property('name', 'Corinthians');
      expect(result.body[0]).to.have.property('totalPoints', 3);
      expect(result.body[0]).to.have.property('totalGames', 1);
      expect(result.body[0]).to.have.property('totalVictories', 1);
      expect(result.body[0]).to.have.property('totalDraws', 0);
      expect(result.body[0]).to.have.property('totalLosses', 0);
      expect(result.body[0]).to.have.property('goalsFavor', 2);
      expect(result.body[0]).to.have.property('goalsOwn', 0);
      expect(result.body[0]).to.have.property('goalsBalance', 2);
      expect(result.body[0]).to.have.property('efficiency', '100.00');
    });

    it('should pass an error to error handler middleware when something goes wrong', async () => {
      stub.rejects(new Error('Unexpected Error'));

      const sut = new ExpressGetLeaderBoardController(getLeaderBoardUseCase);
      const url = '/leaderboard';
      const result = await testController(sut.handle, { url });

      expect(result.spies.next).to.be.have.been.called;
      expect(result.error).to.be.instanceof(Error);
    });
  });
});
