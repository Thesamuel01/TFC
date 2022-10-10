import * as sinon from 'sinon';
import * as chai from 'chai';
import { Response } from 'superagent';
import { sign } from 'jsonwebtoken';
import 'dotenv/config'

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import { matchesMockResult, newMatch, matchWithAnInvalidTeamID, matchWithSameTeamIDs } from './mocks/matches-mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Create matches integration test', () => {
  let chaiHttpResponse: Response;

  const authorization = sign(
    { id:1, role: 'user', email: 'test@test.com' },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' },
  );

  describe('/matches', () => {
    let findByPkStub: sinon.SinonStub;
    let findAllStub: sinon.SinonStub;

    before(async () => {
      findAllStub = sinon
        .stub(Match, "findAll")
        .resolves(matchesMockResult as unknown as Match[]);

      findByPkStub = sinon.stub(Match, "findByPk")
    });

    after(()=>{
      findAllStub.restore();
      findByPkStub.restore();
    });

    it('should be able to create a match, return status code 201 and the match created data', async () => {
      findByPkStub.resolves({ ...matchesMockResult[0] })
  
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', authorization)
        .send({ ...newMatch });

      const match = { ...newMatch, id: 1 }
      const keys = Object.keys(match);

      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.all.keys(keys);
    });

    it('should not be able to create a match when token request is not received', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send({ ...newMatch });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body)
        .to.be.have.property('message')
        .to.be.a('string')
        .to.be.equal('Token not found');
    });

    it('should not be able to create a match when token request is invalid', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', 'invalid_token')
        .send({ ...newMatch });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body)
        .to.be.have.property('message')
        .to.be.a('string')
        .to.be.equal('Token must be a valid token');
    });

    it('should not be able to create a match when teams id does not exist', async () => {
      findByPkStub.resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', authorization)
        .send({ ...matchWithAnInvalidTeamID });

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body)
        .to.be.have.property('message')
        .to.be.a('string')
        .to.be.equal('There is no team with such id!');
    });

    it('should not be able to create a match when both team IDs are the same', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', authorization)
        .send({ ...matchWithSameTeamIDs });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body)
        .to.be.have.property('message')
        .to.be.a('string')
        .to.be.equal('It is not possible to create a match with two equal teams');
    });
  });
});
