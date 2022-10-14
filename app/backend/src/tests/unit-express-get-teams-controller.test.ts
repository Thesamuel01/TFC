import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'dotenv/config';

import { ExpressGetTeamsController } from '../implementations/express';
import { GetTeams } from '../use-cases';
import { InMemoryTeamRepository } from '../repositories/in-memory'
import { NotFoundError } from '../use-cases/errors';
import HttpError from '../implementations/express/helpers/http-status-error';
import testController from './helpers/controllerTest';

const { expect } = chai;
chai.use(sinonChai);

describe('Express get teams controller implementation', () => {
  describe('handle', () => {
    let stub: sinon.SinonStub;
    let getTeamsUseCase: GetTeams;
    
    beforeEach(() => {
      const inMemoryTeamRepository = new InMemoryTeamRepository()
      getTeamsUseCase = new GetTeams(inMemoryTeamRepository);

      stub = sinon.stub(getTeamsUseCase, 'execute');
    });

    afterEach(() => stub.restore());

    it('should return status code 200 and teams array', async () => {
      const teams = [{id: 1, teamName: 'Corinthias'}, { id: 2, teamName: 'Vasco' }];
      stub.resolves(teams);

      const sut = new ExpressGetTeamsController(getTeamsUseCase);
      const result = await testController(sut.handle);

      expect(result.body)
        .to.be.a('array')
        .to.have.deep.ordered.members(teams);
    });

    it('should return status code 200 and a team when Id is received by params', async () => {
      stub.resolves({id: 1, teamName: 'Corinthias'});

      const sut = new ExpressGetTeamsController(getTeamsUseCase);
      const result = await testController(sut.handle, { params: { id: '1 '} });

      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.a('object');
      expect(result.body).to.have.property('id', 1);
      expect(result.body).to.have.property('teamName', 'Corinthias');
    });

    it('should pass an error to error handler middleware when team is not found', async () => {
      stub.rejects(new NotFoundError());

      const sut = new ExpressGetTeamsController(getTeamsUseCase);
      const result = await testController(sut.handle, { params: { id: '90' } });

      expect(result.spies.next).to.have.been.called;
      expect(result.error)
        .to.be.instanceOf(HttpError)
        .to.have.property('message')
        .to.be.equal('Team not found');
    });

    it('should pass an error to error handler middleware when id param is not a number', async () => {
      stub.resolves({id: 1, teamName: 'Corinthias'});

      const sut = new ExpressGetTeamsController(getTeamsUseCase);
      const result = await testController(sut.handle, { params: { id: 'test' } });

      expect(result.spies.next).to.have.been.called;
      expect(result.error)
        .to.be.instanceOf(HttpError)
        .to.have.property('message')
        .to.be.equal('Request param must be a number');
    });
  });
});
