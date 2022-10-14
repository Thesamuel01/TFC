import * as sinon from 'sinon';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { InMemoryTeamRepository } from '../repositories/in-memory';
import { Team } from '../entities';
import { teamsMock } from './mocks/teams-mock';

const { expect } = chai;
chai.use(chaiAsPromised);

describe('In memory team repository', () => {
  describe('findById', () => {
    it('should be able to search by ID and return team', async () => {
      const ID = 1;
      const sut = new InMemoryTeamRepository();
      const team: Team = {
        id: 1,
        teamName: 'Corinthians',
      };    
  
      await expect(sut.findById(ID)).to.eventually.be.eql(team);
    });

    it('should return null when not found an team', async () => {
      const ID = 90;
      const sut = new InMemoryTeamRepository();  
  
      await expect(sut.findById(ID)).to.eventually.be.eql(null);
    });
  });

  describe('findAll', () => {    
    it('should return an array of teams', async () => {
      const sut = new InMemoryTeamRepository();
  
      await expect(sut.findAll())
        .to.eventually
        .be.a('array')
        .and.to.have.deep.ordered.members(teamsMock);

    });
  })
});
