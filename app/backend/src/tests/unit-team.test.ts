import * as sinon from 'sinon';
import * as chai from 'chai';

import Team, { TeamData } from '../entities/team';

const { expect } = chai;

describe('Team domain entity', () => {
  it('should able to create a team', () => {
    const teamData: TeamData = {
      id: 1,
      name: 'Vasco'
    }

    const team = Team.create(teamData);

    expect(team).to.be.an.instanceof(Team);
  });
});
