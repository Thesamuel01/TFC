import * as sinon from 'sinon';
import * as chai from 'chai';

import Match, { MatchData } from '../entities/match';
import Team from '../entities/team';

// @ts-ignore
const { expect } = chai;

describe('Match domain entity', () => {
  it('should able to create a match', () => {
    const homeTeam = Team.create({ id: 1, name: 'Corinthias' });
    const awayTeam = Team.create({ id: 2, name: 'Palmeiras' });
    const teamData: MatchData = {
      homeTeam,
      awayTeam,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      inProgress: true 
    }

    const match = Match.create(teamData);

    expect(match).to.be.an.instanceof(Match);
  });

  it('should able to create a match when id already exist', () => {
    const homeTeam = Team.create({ id: 1, name: 'Corinthias' });
    const awayTeam = Team.create({ id: 2, name: 'Palmeiras' });
    const teamData: MatchData = {
      id: 1,
      homeTeam,
      awayTeam,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      inProgress: true 
    }

    const match = Match.create(teamData);

    expect(match).to.be.an.instanceof(Match);
  });
});
