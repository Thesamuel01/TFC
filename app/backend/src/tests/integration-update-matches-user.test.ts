import * as sinon from 'sinon';
import * as chai from 'chai';
import { Response } from 'superagent';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';

chai.use(chaiHttp);

const { expect } = chai;

describe('Update matches integration test', () => {
  let chaiHttpResponse: Response;

  describe('/matches/:id/finish', () => {
    before(async () => {
      sinon
        .stub(Match, "update");
    });

    after(()=>{
      (Match.update as sinon.SinonStub).restore();
    })

    it('should be able to update in progress match, return status code 200 and a message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1')
        .send({
          homeTeamGoals: 3,
          awayTeamGoals: 1,
        });

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message', 'Updated');
    });
  });

  describe('/matches/:id', () => {
    before(async () => {
      sinon
        .stub(Match, 'update');
    });

    after(()=>{
      (Match.update as sinon.SinonStub).restore();
    })

    it('should be able to update a match to finished, return status code 200 and a message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/finish');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message', 'Finished');
    });
  });
});
