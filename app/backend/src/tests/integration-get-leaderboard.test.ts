import * as sinon from 'sinon';
import * as chai from 'chai';
import { Response } from 'superagent';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { matchesMockResult } from './mocks/matches-mock';
import { teamsMock } from './mocks/teams-mock';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { awayLeaderBoard, leaderboards, homeLeaderBoard } from './mocks/leaderboard-mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Get matches integration test', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    const finishedMatches = matchesMockResult.filter(({ inProgress }) => !inProgress);
    sinon
      .stub(Match, "findAll")
      .resolves(finishedMatches as unknown as Match[]);
    
    sinon
      .stub(Team, "findAll")
      .resolves(teamsMock as unknown as Match[]);
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
    (Team.findAll as sinon.SinonStub).restore();
  })

  describe('/leaderboard', () => {
    it('should return an status code 200 and general leaderboard', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard');
      
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body).to.be.eql(leaderboards);
    });
  });

  describe('/leaderboard/away', () => {
    it('should return an status code 200 and away teams leaderboard', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away');
      
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body).to.be.eql(awayLeaderBoard);
    });
  });

  describe('/leaderboard/home', () => {
    it('should return an status code 200 and away teams leaderboard', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home');
      
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body).to.be.eql(homeLeaderBoard);
    });
  });
});
