import * as sinon from 'sinon';
import * as chai from 'chai';
import { Response } from 'superagent';
import { sign } from 'jsonwebtoken';
import 'dotenv/config'

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import { matchesMockResult } from './mocks/matches-mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Get matches integration test', () => {
  let chaiHttpResponse: Response;

  describe('/matches', () => {

    before(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(matchesMockResult as unknown as Match[]);
    });

    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('should return an status code 200 and all matches', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches');
      
      const match = matchesMockResult[0]
      const keys = Object.keys(match);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body[0]).to.have.all.keys(...keys);
      expect(chaiHttpResponse.body[0]).to.be.eql(match);
    });
  });

  describe('/matches?inProgress=', () => {
    it('should return only in progress matches when true is received by query params', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true')

      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body[0]).to.have.property('inProgress', true);
    });

    it('should return only finished matches when false is received by query params', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=false')
   
      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body[0]).to.have.property('inProgress', false);
    });
  });
});
