import * as sinon from 'sinon';
import * as chai from 'chai';
import { Response } from 'superagent';
import { sign } from 'jsonwebtoken';
import 'dotenv/config'

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';

chai.use(chaiHttp);

const { expect } = chai;

describe('Update matches integration test', () => {
  let chaiHttpResponse: Response;

  describe('/matches/:id', () => {
    before(async () => {
      sinon
        .stub(Match, "update");
    });

    after(()=>{
      (Match.update as sinon.SinonStub).restore();
    })

    it('should be able to update an in progress match, return status code 200 and a message', async () => {
      const matchUpdated = {
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 3,
        awayTeam: 8,
        awayTeamGoals: 1,
        inProgress: false,
        teamHome: {
          teamName: 'São Paulo'
        },
        teamAway: {
          teamName: 'Grêmio'
        }
      }

      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/finish')
        .send({
          homeTeamGoals: 3,
          awayTeamGoals: 1
        });

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.be.eql(matchUpdated);
    });
  });

  describe('/matches/:id/finish', () => {
    before(async () => {
      sinon
        .stub(Match, "update");
    });

    after(()=>{
      (Match.update as sinon.SinonStub).restore();
    })

    it('should be able to update a match to finished, return status code 200 and a message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/:1/finish');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message', 'Finished');
    });

    it('should not be able to update already finished match, return status code 422 and a message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/:2/finish');

      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message', 'The match is already finished');
    });
  });
});
