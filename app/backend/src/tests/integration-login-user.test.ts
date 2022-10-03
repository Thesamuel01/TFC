import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login integration test', () => {
  describe('data validation', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves({
          id: 1,
          username: 'Admin',
          role: 'admin',
          email: 'admin@admin.com',
          password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
        } as User);
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('should return an status code 200 and a token', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        })


      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body)
        .to.be.have.property('token')
        .to.be.a('string');
    });

    it('should return a status code 400 and an error message when there is no email field',async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          password: 'secret_admin'
        })


      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body)
        .to.be.have.property('message')
        .to.be.a('string')
        .to.be.equal('All fields must be filled');
    });


    it('should return a status code 400 and an error message when the email field is blank',async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: '',
          password: 'secret_admin',
        })


      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body)
        .to.be.have.property('message')
        .to.be.a('string')
        .to.be.equal('All fields must be filled');
    });

    it('should return a status code 400 and an error message when there is no password field',async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
        })


      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body)
        .to.be.have.property('message')
        .to.be.a('string')
        .to.be.equal('All fields must be filled');
    });


    it('should return a status code 400 and an error message when the password field is blank',async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: '',
        })


      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body)
        .to.be.have.property('message')
        .to.be.a('string')
        .to.be.equal('All fields must be filled');
    });

    it('should return a status code 400 and an error message when email is in an invalid format',async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin_admin.com',
          password: 'secret_admin',
        })


      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body)
        .to.be.have.property('message')
        .to.be.a('string')
        .to.be.equal('Incorrect email or password');
    });

    it('should return a status code 400 and an error message when password length is less than 6',async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secr',
        })


      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body)
        .to.be.have.property('message')
        .to.be.a('string')
        .to.be.equal('Incorrect email or password');
    });
  });

  describe('incorrect data', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(null);
    });
  
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    });

    it('should return a status code 401 and an error message when email is incorrect',async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@test.com',
          password: 'secret_admin',
        })
  
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body)
        .to.be.have.property('message')
        .to.be.a('string')
        .to.be.equal('Incorrect email or password');
    });
  
  
    it('should return a status code 400 and an error message when password is incorrect',async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'random_password',
        })
  
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body)
        .to.be.have.property('message')
        .to.be.a('string')
        .to.be.equal('Incorrect email or password');
    });
  });
});