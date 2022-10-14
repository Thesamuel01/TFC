import * as sinon from 'sinon';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { GetTeams } from '../use-cases';
import { InMemoryTeamRepository } from '../repositories/in-memory'
import { NotFoundError } from '../use-cases/errors';
import { teamsMock } from './mocks/teams-mock';

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Get teams use case', () => {
  let getTeamsUseCase: GetTeams;

  before(() => {
    const teamRepository = new InMemoryTeamRepository();
    getTeamsUseCase = new GetTeams(teamRepository);
  });

  describe('Without ID', () => {
    it('should return an array of teams', async () => {
      const sut = await getTeamsUseCase.execute();
      
      expect(sut).to.be.a('array');
      expect(sut).to.have.deep.ordered.members(teamsMock);
    });
  });

  describe('With ID', () => {
    it('should return a team', async () => {
      const ID = 1;
      const sut = await getTeamsUseCase.execute(ID);
      
      expect(sut)
        .to.have.property('id')
        .to.be.a('number')
        .to.be.equal(1);
      expect(sut)
        .to.have.property('teamName')
        .to.be.a('string')
        .to.be.equal('Corinthians');
    });

    it('should throw an error when team is not found', async () => {
      const ID = 90;
      
      await expect(getTeamsUseCase.execute(ID))
        .to.eventually.be.rejectedWith('Item not found')
        .to.be.instanceOf(NotFoundError);
    });
  });
})