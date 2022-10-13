import * as sinon from 'sinon';
import * as chai from 'chai';

import Match, { MatchData } from '../entities/match';
import Team from '../entities/team';

// @ts-ignore
const { expect } = chai;

describe('Match domain entity', () => {
  it('should able to create a match', () => {
    const match = Match.create({
      homeTeamId: 1,
      homeTeamName: 'Corinthias',
      homeTeamGoals: 2,
      awayTeamId: 2,
      awayTeamName: 'Vasco',
      awayTeamGoals: 2,
      inProgress: true,
    });

    expect(match).to.be.an.instanceof(Match);
  });

  it('should able to create a match when id already exist', () => {
    const match = Match.create({
      id: 1,
      homeTeamId: 1,
      homeTeamName: 'Corinthias',
      homeTeamGoals: 2,
      awayTeamId: 2,
      awayTeamName: 'Vasco',
      awayTeamGoals: 2,
      inProgress: true,
    });

    expect(match).to.be.an.instanceof(Match);
  });
});
