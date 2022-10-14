import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'dotenv/config';

import { ExpressCreateMatchController } from '../implementations/express';
import { CreateMatch } from '../use-cases';
import { InMemoryTeamRepository, InMemoryMatchRepository} from '../repositories/in-memory'
import { EqualTeamsIDsError, NotFoundError } from '../use-cases/errors';
import { newMatch, matchWithAnInvalidTeamID, matchWithSameTeamIDs } from './mocks/matches-mock';
import HttpError from '../implementations/express/helpers/http-status-error';
import testController from './helpers/controllerTest';

const { expect } = chai;
chai.use(sinonChai);

describe('Express get teams controller implementation', () => {
  let stub: sinon.SinonStub;
  let createMatchUseCase: CreateMatch;

  before(() => {
    const matchRepository = new InMemoryMatchRepository();
    const teamRepository = new InMemoryTeamRepository();
    createMatchUseCase = new CreateMatch(matchRepository, teamRepository);

    stub = sinon.stub(createMatchUseCase, 'execute');
  });

  after(() => {
    stub.restore();
  });

  describe('handle', () => {
    it('should be able to create a match, return status code 201 and the match created', async () => {
      const createdMatch = { id: 1, ...newMatch }
      stub.resolves(createdMatch);

      const sut = new ExpressCreateMatchController(createMatchUseCase);
      const result = await testController(sut.handle, { body: newMatch });

      expect(result.status).to.be.equal(201);
      expect(result.body).to.deep.includes(createdMatch);
    });

    it('should pass a http error to the error handler middleware when both team ids are the same', async () => {
      stub.throws(new EqualTeamsIDsError);

      const sut = new ExpressCreateMatchController(createMatchUseCase);
      const result = await testController(sut.handle, { body: matchWithSameTeamIDs });

      expect(result.error).to.be.instanceOf(HttpError)
      expect(result.error).to.have.property('message', 'It is not possible to create a match with two equal teams')
      expect(result.error).to.have.property('statusCode', 401);
    });

    it('should pass a http error to the error handler middleware when teams id are not found', async () => {
      stub.throws(new NotFoundError);

      const sut = new ExpressCreateMatchController(createMatchUseCase);
      const result = await testController(sut.handle, { body: matchWithAnInvalidTeamID });
      
      expect(result.error).to.be.instanceOf(HttpError)
      expect(result.error).to.have.property('message', 'There is no team with such id!')
      expect(result.error).to.have.property('statusCode', 404);
    });

    it('should pass error to the error handler middleware when unexpected error occurs', async () => {
      stub.throws(new Error());

      const sut = new ExpressCreateMatchController(createMatchUseCase);
      const result = await testController(sut.handle, { body: newMatch });
      
      expect(result.spies.next).to.have.been.called;
    });
  });
});
