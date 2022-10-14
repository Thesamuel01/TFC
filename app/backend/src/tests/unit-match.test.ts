import * as sinon from 'sinon';
import * as chai from 'chai';

import Match from '../entities/match';

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
    expect(match.awayTeam).to.be.equal(2);
    expect(match.awayTeamGoals).to.be.equal(2);
    expect(match.homeTeam).to.be.equal(1);
    expect(match.homeTeamGoals).to.be.equal(2);
    expect(match.inProgress).to.be.equal(true);
    expect(match.teamAway.teamName).to.be.equal('Vasco');
    expect(match.teamHome.teamName).to.be.equal('Corinthias');
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
    expect(match.awayTeam).to.be.equal(2);
    expect(match.awayTeamGoals).to.be.equal(2);
    expect(match.homeTeam).to.be.equal(1);
    expect(match.homeTeamGoals).to.be.equal(2);
    expect(match.inProgress).to.be.equal(true);
    expect(match.teamAway.teamName).to.be.equal('Vasco');
    expect(match.teamHome.teamName).to.be.equal('Corinthias');
  });
});
