import * as sinon from 'sinon';
import * as chai from 'chai';

import { LeaderBoard, Team } from '../entities';
import { LeaderBoardData } from '../entities/leaderboard';
import { matchesMockResult } from './mocks/matches-mock';

const { expect } = chai;

describe('Leaderboard domain entity', () => {
  describe('create', () => {
    it('should to create a leaderboard instance', () => {
      const leaderboardData: LeaderBoardData = {
        name: 'Corinthians',
        totalGames: 1,
        totalVictories: 1,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 2,
        goalsOwn: 0,
      }
  
      const sut = LeaderBoard.create(leaderboardData);
  
      expect(sut).to.be.an.instanceof(LeaderBoard);
      expect(sut).to.have.property('name', 'Corinthians');
      expect(sut).to.have.property('totalPoints', 3);
      expect(sut).to.have.property('totalGames', 1);
      expect(sut).to.have.property('totalVictories', 1);
      expect(sut).to.have.property('totalDraws', 0);
      expect(sut).to.have.property('totalLosses', 0);
      expect(sut).to.have.property('goalsFavor', 2);
      expect(sut).to.have.property('goalsOwn', 0);
      expect(sut).to.have.property('goalsBalance', 2);
      expect(sut).to.have.property('efficiency', '100.00');
    });
  });

  describe('format', () => {
    it('should return an object with all leaderboard infos', () => {
      const sut = LeaderBoard
        .create({
          name: 'Corinthians',
          totalGames: 1,
          totalVictories: 1,
          totalDraws: 0,
          totalLosses: 0,
          goalsFavor: 2,
          goalsOwn: 0,
        })
        .format();

      expect(sut).not.to.be.instanceof(LeaderBoard);
      expect(sut).to.be.a('object');
      expect(sut).to.have.property('name', 'Corinthians');
      expect(sut).to.have.property('totalPoints', 3);
      expect(sut).to.have.property('totalGames', 1);
      expect(sut).to.have.property('totalVictories', 1);
      expect(sut).to.have.property('totalDraws', 0);
      expect(sut).to.have.property('totalLosses', 0);
      expect(sut).to.have.property('goalsFavor', 2);
      expect(sut).to.have.property('goalsOwn', 0);
      expect(sut).to.have.property('goalsBalance', 2);
      expect(sut).to.have.property('efficiency', '100.00');
    });
  });

  describe('calcGamesResult', () => {
    it('should return an object with "totalVictories", "totalDraws" and "totalLosses" of a team from the matches', () => {
      const team = Team.create({ id: 1, name: 'Corinthians' });
      const matches = [...matchesMockResult.filter(({ inProgress }) => !inProgress )];

      const sut = LeaderBoard.calcGamesResult(team, matches);

      expect(sut).to.have.deep.property('totalGames', 1);
      expect(sut).to.have.deep.property('totalVictories', 1);
      expect(sut).to.have.deep.property('totalDraws', 0);
      expect(sut).to.have.deep.property('totalLosses', 0);
    });
  });

  describe('calcGoalsAmount', () => {
    it('should return an object with "goalsFavor" and "goalsOwn" amount of a team from the matches', () => {
      const team = Team.create({ id: 1, name: 'Corinthians' });
      const matches = [...matchesMockResult.filter(({ inProgress }) => !inProgress )];

      const sut = LeaderBoard.calcGoalsAmount(team, matches);

      expect(sut).to.have.deep.property('goalsFavor', 2);
      expect(sut).to.have.deep.property('goalsOwn', 0);
    });
  });
});
