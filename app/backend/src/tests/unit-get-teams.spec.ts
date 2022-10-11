import * as sinon from 'sinon';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { GetTeams } from '../use-cases';
import { InMemoryTeamRepository } from '../repositories/in-memory'
import { Team } from '../entities';
import { NotFoundError } from '../use-cases/errors';

// @ts-ignore

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Get teams use case', () => {
  let getTeamsUseCase: GetTeams;
  let teamRepository: InMemoryTeamRepository;

  before(() => {
    teamRepository = new InMemoryTeamRepository();
    getTeamsUseCase = new GetTeams(teamRepository);
  });

  describe('Without ID', () => {
    it('should return an array of teams', async () => {
      const sut = await getTeamsUseCase.execute();
      const teams: Team[] = [{id: 1, teamName: 'Corinthias'}, { id: 2, teamName: 'Vasco' }];
      
      expect(sut).to.be.a('array');
      expect(sut).to.have.deep.ordered.members(teams);
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
        .to.be.equal('Corinthias');
    });

    it('should throw an error when team is not found', async () => {
      const ID = 90;
      
      await expect(getTeamsUseCase.execute(ID))
        .to.eventually.be.rejectedWith('Item not found')
        .to.be.instanceOf(NotFoundError);
    });
  });
})