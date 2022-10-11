import * as sinon from 'sinon';
import * as chai from 'chai';
import { afterEach, beforeEach } from 'mocha';
import * as sinonChai from 'sinon-chai';
import 'dotenv/config';

import { ExpressAuthController } from '../implementations/express';
import { loginUserUseCase } from './mocks/login-user-use-case-mock';
import { InvalidTokenError, TokenExpiredError, UnknownError } from '../use-cases/errors';
import testController from './helpers/controllerTest';
import HttpError from '../implementations/express/helpers/http-status-error';

// @ts-ignore
const { expect } = chai;
chai.use(sinonChai)

describe('Express auth controller implementation', () => {
  describe('handle', () => {
    let stub: sinon.SinonStub;

    beforeEach(() => {
      stub = sinon.stub(loginUserUseCase, 'validate');
    });

    afterEach(() => {
      stub.restore()
    });

    it('should go to next middleware', async () => {
      stub.returns({
        id: 1,
        email: 'test@test.com',
        role: 'user',
      });

      const headers = { authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NjQ2MDU1OTEsImV4cCI6MTY2NDYwNTU5MX0.rJAKM1Lx1uC8x4ljy0FY9x3x5uZQxiPFQhxMXV-0_oo'}
      const sut = new ExpressAuthController(loginUserUseCase);
      const result = await testController(sut.handle, { headers });
      
      expect(result.spies.next).to.have.been.calledOnce;
    });
  
    it('should pass a http error to error handler middleware when there is no token', async () => {
      const sut = new ExpressAuthController(loginUserUseCase);
      const headers = { }
  
      const result = await testController(sut.handle, { headers });

      expect(result.error)
        .to.be.instanceOf(HttpError)
        .to.have.property('message', 'Token not found');
    });

    it('should pass a http error to error handler middleware when there is no token', async () => {
      stub.throws(new InvalidTokenError());

      const headers = { authorization: 'invalid_token'}
      const sut = new ExpressAuthController(loginUserUseCase);
      const result = await testController(sut.handle, { headers });

      expect(result.error)
        .to.be.instanceOf(HttpError)
        .to.have.property('message', 'Token must be a valid token');
    });

    it('should pass a http error to error handler middleware when token is expired', async () => {
      stub.throws(new TokenExpiredError());

      const headers = { authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NjQ2MDU1OTEsImV4cCI6MTY2NDYwNTU5MX0.rJAKM1Lx1uC8x4ljy0FY9x3x5uZQxiPFQhxMXV-0_oo'}
      const sut = new ExpressAuthController(loginUserUseCase);
      const result = await testController(sut.handle, { headers });

      expect(result.error)
        .to.be.instanceOf(HttpError)
        .to.have.property('message', 'Token expired');
    });

    it('should pass an error to error handler middleware when a unknown error happen', async () => {
      stub.throws(new UnknownError());

      const headers = { authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NjQ2MDU1OTEsImV4cCI6MTY2NDYwNTU5MX0.rJAKM1Lx1uC8x4ljy0FY9x3x5uZQxiPFQhxMXV-0_oo'}
      const sut = new ExpressAuthController(loginUserUseCase);
      const result = await testController(sut.handle, { headers });

      expect(result.error).to.be.instanceOf(Error);
    });
  });
});
