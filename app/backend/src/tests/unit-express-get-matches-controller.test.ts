import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'dotenv/config';

import { ExpressGetMatchesController } from '../implementations/express';
import { GetMatches } from '../use-cases';
import { InMemoryMatchRepository } from '../repositories/in-memory'
import { matchesMockResult } from './mocks/matches-mock';
import HttpError from '../implementations/express/helpers/http-status-error';
import testController from './helpers/controllerTest';

const { expect } = chai;
chai.use(sinonChai);

describe('Express get matches controller implementation', () => {
  describe('handle', () => {
    let stub: sinon.SinonStub;
    let getMatchesUseCase: GetMatches;
    
    beforeEach(() => {
      const inMemoryMatchRepository = new InMemoryMatchRepository()
      getMatchesUseCase = new GetMatches(inMemoryMatchRepository);

      stub = sinon.stub(getMatchesUseCase, 'execute');
    });

    afterEach(() => stub.restore());

    it('should return status code 200 and all matches when no query param is received', async () => {
      const matches = [...matchesMockResult]
      stub.resolves(matches);

      const sut = new ExpressGetMatchesController(getMatchesUseCase);
      const result = await testController(sut.handle);

      expect(result.status).to.be.equal(200)
      expect(result.body)
        .to.be.a('array')
        .to.have.deep.ordered.members(matches);
    });

    it('should return status code 200 and all matches in progress when no query param inProgress=true is received', async () => {
      const matches = [matchesMockResult[2]];
      stub.resolves(matches);

      const sut = new ExpressGetMatchesController(getMatchesUseCase);
      const result = await testController(sut.handle, { query: { inProgress: 'true' } });

      expect(result.status).to.be.equal(200)
      expect(result.body).to.be.an('array');
      expect(result.body[0]).to.have.property('inProgress', true);
      expect(stub).to.have.been.calledWith({ inProgress: true });
    });

    it('should return status code 200 and all matches finished when query param inProgress=false is received', async () => {
      const matches = [matchesMockResult[0]];
      stub.resolves(matches);

      const sut = new ExpressGetMatchesController(getMatchesUseCase);
      const result = await testController(sut.handle, { query: { inProgress: 'false' } });

      expect(result.status).to.be.equal(200)
      expect(result.body).to.be.an('array');
      expect(result.body[0]).to.have.property('inProgress', false);
      expect(stub).to.have.been.calledWith({ inProgress: false });
    });

    it('should pass a http error to the error handler middleware when quey string received is not a boolean', async () => {
      const sut = new ExpressGetMatchesController(getMatchesUseCase);
      const result = await testController(sut.handle, { query: { inProgress: 'huidas' } });

      expect(result.error).to.be.instanceOf(HttpError)
      expect(result.error).to.have.property('message', 'inProgress query string must be a boolean value')
      expect(result.error).to.have.property('statusCode', 400);
    });
  });
});
