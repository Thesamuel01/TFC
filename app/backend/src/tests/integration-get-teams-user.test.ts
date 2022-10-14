import * as sinon from 'sinon';
import * as chai from 'chai';
import { Response } from 'superagent';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

describe('Get teams integration test', () => {
  describe('/teams', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Team, "findAll")
        .resolves([{id: 1, teamName: 'Avaí/Kindermann'}, { id: 2, teamName: 'BahiaVasco' }] as Team[]);
    });

    after(()=>{
      (Team.findAll as sinon.SinonStub).restore();
    })

    it('should return an status code 200 and all teams', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams');


      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.a('array');
      expect(chaiHttpResponse.body[0]).to.have.property('id', 1);
      expect(chaiHttpResponse.body[0]).to.have.property('teamName', 'Avaí/Kindermann');
    });
  });

  describe('/teams/:id', () => {
    let chaiHttpResponse: Response;
    let stub: sinon.SinonStub;

    beforeEach(async () => {
      stub = sinon.stub(Team, "findByPk")
    });

    afterEach(()=>{
      (Team.findByPk as sinon.SinonStub).restore();
    });

    it('should return a status code 200 and a team',async () => {
      stub.resolves({id: 1, teamName: 'Avaí/Kindermann'} as Team);

      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/1');


      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.have.property('id', 1);
      expect(chaiHttpResponse.body).to.be.have.property('teamName', 'Avaí/Kindermann');
    });
  
    it('should return a status code 400 and an error message when request param is not a number',async () => {
      stub.resolves({id: 1, teamName: 'Avaí/Kindermann'} as Team);

      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/test')


      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body)
        .to.be.have.property('message')
        .to.be.a('string')
        .to.be.equal('Request param must be a number');
    });


    it('should return a status code 404 and an error message when the team is not found',async () => {
      stub.resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/90');


      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body)
        .to.be.have.property('message')
        .to.be.a('string')
        .to.be.equal('Team not found');
    });
  });
});