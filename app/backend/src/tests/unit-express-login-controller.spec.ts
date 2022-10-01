import * as sinon from 'sinon';
import * as chai from 'chai';
import { afterEach, beforeEach } from 'mocha';
import { sign } from 'jsonwebtoken';
import 'dotenv/config';

import ExpressLoginController from '../implementations/express';
import { LoginUserRequestDTO } from '../DTOs';
import { loginUserUseCase } from './mocks/login-user-use-case-mock';
import testController from './helpers/controllerTest';
import HttpError from '../implementations/express/helpers/http-status-error';
import { InvalidEmailError, InvalidPasswordError } from '../entities/errors';
import { IncorrectEmailError, IncorrectPasswordError, TokenExpiredError } from '../use-cases/errors';

// @ts-ignore
const { expect } = chai;

describe('Express login user controller implementation', () => {
  describe('handle', () => {
    let stub: sinon.SinonStub;
    
    beforeEach(() => stub = sinon.stub(loginUserUseCase, 'execute'));
    afterEach(() => stub.restore());

    it('should pass a http error to error handler middleware when there is no email field or is blank', async () => {
      stub.restore();

      const sut = new ExpressLoginController(loginUserUseCase);
      const body = {
        password: 'my_secret_password'
      } as LoginUserRequestDTO
  
      const result = await testController(sut.handle, { body });

      expect(result.error).to.be.instanceOf(HttpError);
    });

    it('should pass a http error to error handler middleware when there is no password field or is blank', async () => {
      stub.restore();

      const sut = new ExpressLoginController(loginUserUseCase);
      const body = {
        email: 'test@test.com'
      } as LoginUserRequestDTO
  
      const result = await testController(sut.handle, { body });
      
      expect(result.error).to.be.instanceOf(HttpError);
    });

    it('should return status code 200 and a token', async () => {
      stub.resolves({ token: 'tokenCreated'})

      const sut = new ExpressLoginController(loginUserUseCase);
      const body: LoginUserRequestDTO = {
        email: 'test@test.com',
        password: 'my_secret_password',
      }
  
      const result = await testController(sut.handle, { body });

      expect(result.status).to.be.equal(200);
      expect(result.body)
        .to.be.have.property('token')
        .to.be.a('string');
    });

    it('should pass an error to error handler middleware when email is incorrect', async () => {
      stub.rejects(new IncorrectEmailError());

      const sut = new ExpressLoginController(loginUserUseCase);
      const body: LoginUserRequestDTO = {
        email: 'test_test.com',
        password: 'my_secret_password',
      }
  
      const result = await testController(sut.handle, { body });
      
      expect(result.error).to.be.instanceOf(HttpError);
    });

    it('should pass an error to error handler middleware when email is incorrect', async () => {
      stub.rejects(new IncorrectPasswordError());

      const sut = new ExpressLoginController(loginUserUseCase);
      const body: LoginUserRequestDTO = {
        email: 'test_test.com',
        password: 'my_secret_password',
      }
  
      const result = await testController(sut.handle, { body });

      expect(result.error).to.be.instanceOf(HttpError);
    });

    it('should pass an error to error handler middleware', async () => {
      stub.rejects(new InvalidEmailError());

      const sut = new ExpressLoginController(loginUserUseCase);
      const body: LoginUserRequestDTO = {
        email: 'test_test.com',
        password: 'my_secret_password',
      }

      const result = await testController(sut.handle, { body });

      expect(result.error).to.be.instanceOf(HttpError);
    });

    it('should pass an error to error handler middleware', async () => {
      stub.rejects(new InvalidPasswordError());

      const sut = new ExpressLoginController(loginUserUseCase);
      const body: LoginUserRequestDTO = {
        email: 'test_test.com',
        password: 'my_secret_password',
      }

      const result = await testController(sut.handle, { body });

      expect(result.error).to.be.instanceOf(HttpError);
    });
});

  describe('validate', () => {
    it('should pass a http error to error handler middleware when there is no token', async () => {
      const sut = new ExpressLoginController(loginUserUseCase);
      const headers = { }
  
      const result = await testController(sut.validate, { headers });

      expect(result.error).to.be.instanceOf(HttpError);
    });

    it('should pass a http error to error handler middleware when token is expired', async () => {
      const stub = sinon.stub(loginUserUseCase, 'validate').throws(new TokenExpiredError());

      const headers = { authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NjQ2MDU1OTEsImV4cCI6MTY2NDYwNTU5MX0.rJAKM1Lx1uC8x4ljy0FY9x3x5uZQxiPFQhxMXV-0_oo'}
      const sut = new ExpressLoginController(loginUserUseCase);
      const result = await testController(sut.validate, { headers });

      expect(result.error).to.be.instanceOf(HttpError);

      stub.restore();
    });

    it('should return status code 200 and user role', async () => {
      const stub = sinon.stub(loginUserUseCase, 'validate').returns({
        id: 1,
        email: 'test@test.com',
        role: 'user',
      });

      const headers = { authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NjQ2MDU1OTEsImV4cCI6MTY2NDYwNTU5MX0.rJAKM1Lx1uC8x4ljy0FY9x3x5uZQxiPFQhxMXV-0_oo'}
      const sut = new ExpressLoginController(loginUserUseCase);
      const result = await testController(sut.validate, { headers });

      expect(result.status).to.be.eq(200);
      expect(result.body).to.be.eql({ role: 'user' });

      stub.restore();
    });
  });
});
