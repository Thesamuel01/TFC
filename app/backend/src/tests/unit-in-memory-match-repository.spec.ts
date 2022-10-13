import * as sinon from 'sinon';
import * as chai from 'chai';

import { InMemoryMatchRepository } from '../repositories/in-memory';
import { matchesMockResult, updateMatchData } from './mocks/matches-mock'
import { Match } from '../entities';
// @ts-ignore
const { expect } = chai;

describe('In memory match  repository', () => {
  describe('findByPk', () => {
    it('should be able to search by ID and return team', async () => {
      const ID = 1;
      const sut = new InMemoryMatchRepository();
      const match = { ...matchesMockResult[0] };    
  
      await expect(sut.findByPk(ID)).to.eventually.be.eql(match);
    });

    it('should return null when not found an team', async () => {
      const ID = 90;
      const sut = new InMemoryMatchRepository();  
  
      await expect(sut.findByPk(ID)).to.eventually.be.eql(null);
    });
  });

  describe('findAll', () => {    
    it('should return an array of teams', async () => {
      const sut = new InMemoryMatchRepository();
      const matches = [ ...matchesMockResult]
 
  
      await expect(sut.findAll())
        .to.eventually
        .be.a('array')
        .and.to.have.deep.ordered.members(matches);
    });

    it('should return an array of teams filter by in progress attr is true', async () => {
      const sut = new InMemoryMatchRepository();
      const params = { inProgress: true };
      const result = await sut.findAll(params);
 
      expect(result).to.be.an('array');
      expect(result[0]).to.have.property('inProgress', true);
    });

    it('should return an array of teams filter by in progress attr is false', async () => {
      const sut = new InMemoryMatchRepository();
      const params = { inProgress: false };
      const result = await sut.findAll(params);
 
      expect(result).to.be.an('array');
      expect(result[0]).to.have.property('inProgress', false);
    });
  });

  describe('create', () => {
    it('should be able to search by ID and return team', async () => {
      const sut = new InMemoryMatchRepository();
      const match = Match.create({
        homeTeamId: 1,
        homeTeamName: 'Corinthias',
        homeTeamGoals: 2,
        awayTeamId: 2,
        awayTeamName: 'Vasco',
        awayTeamGoals: 2,
        inProgress: true,
      });
  
      await expect(sut.insert(match)).to.eventually.be.eql({
        id: 3,
        homeTeam: 1,
        homeTeamGoals: 2,
        awayTeam: 2,
        awayTeamGoals: 2,
        inProgress: true,
      });
      await expect(sut.findAll()).to.eventually.have.length(3);
    });
  });

  describe('update', () => {
    it('should be able to search by ID and return team', async () => {
      const sut = new InMemoryMatchRepository();
      const match = { ...updateMatchData };
  
      await sut.update(match)
      const matches = await sut.findAll();
  
      expect(matches[0]).to.have.property('homeTeamGoals', 3);
      expect(matches[0]).to.have.property('awayTeamGoals', 1);
    });
  });
});
