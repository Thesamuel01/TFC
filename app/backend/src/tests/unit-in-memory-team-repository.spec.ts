import * as sinon from 'sinon';
import * as chai from 'chai';

import { InMemoryTeamRepository } from '../repositories/in-memory';
import { Team } from '../entities';

// @ts-ignore
const { expect } = chai;

describe('In memory user repository', () => {
  describe('findById', () => {
    it('should be able to search by ID and return team', async () => {
      const ID = 1;
      const sut = new InMemoryTeamRepository();
      const team: Team = {
        id: 1,
        teamName: 'Corinthias',
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
      const teams: Team[] = [{id: 1, teamName: 'Corinthias'}, { id: 2, teamName: 'Vasco' }];
 
  
      await expect(sut.findAll())
        .to.eventually
        .be.a('array')
        .and.to.have.deep.ordered.members(teams);

    });
  })
});
