import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'dotenv/config';

import { ExpressUpdateMatchController } from '../implementations/express';
import { UpdateMatch } from '../use-cases';
import { InMemoryMatchRepository} from '../repositories/in-memory'
import testController from './helpers/controllerTest';

const { expect } = chai;
chai.use(sinonChai)

describe('Express get teams controller implementation', () => {
  let stub: sinon.SinonStub;
  let updateMatchUseCase: UpdateMatch;

  before(() => {
    const matchRepository = new InMemoryMatchRepository();
    updateMatchUseCase = new UpdateMatch(matchRepository);

    stub = sinon.stub(updateMatchUseCase, 'execute');
  });

  after(() => {
    stub.restore();
  });

  describe('handle', () => {
    it('should be able to update a match goals, return a status code 200 and a message', async () => {
      const updated = { message: 'Updated' }
      stub.resolves(updated);

      const body = { homeTeamGoals: 3, awayTeamGoals: 1 };
      const params = { id: '1' };
      const url = 'matches/1';

      const sut = new ExpressUpdateMatchController(updateMatchUseCase);
      const result = await testController(sut.handle, { body, params, url });

      expect(result.status).to.be.equal(200);
      expect(result.body).to.have.property('message', 'Updated');
    });

    it('should be able to update a match status to finished, return a status code 200 and a message', async () => {
      const updated = { message: 'Finished' }
      stub.resolves(updated);

      const params = { id: '1' };
      const url = 'matches/1/finish';

      const sut = new ExpressUpdateMatchController(updateMatchUseCase);
      const result = await testController(sut.handle, { url, params });

      expect(result.status).to.be.equal(200);
      expect(result.body).to.have.property('message', 'Finished');
    });

    it('should pass error to the error handler middleware when unexpected error occurs', async () => {
      stub.throws(new Error());

      const body = { homeTeamGoals: 3, awayTeamGoals: 1 };
      const params = { id: '1' };

      const sut = new ExpressUpdateMatchController(updateMatchUseCase);
      const result = await testController(sut.handle, { body, params });
      
      expect(result.spies.next).to.has.been.called;
    });
  });
});
