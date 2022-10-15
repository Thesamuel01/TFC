import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'dotenv/config';

import { ExpressLoginController } from '../implementations/express';
import { LoginUserRequestDTO } from '../DTOs';
import { loginUserUseCase } from './mocks/login-user-use-case-mock';
import { IncorrectEmailError, IncorrectPasswordError, UnknownError } from '../use-cases/errors';
import HttpError from '../implementations/express/helpers/http-status-error';
import testController from './helpers/controllerTest';

const { expect } = chai;
chai.use(sinonChai);

describe('Express login user controller implementation', () => {
  describe('handle', () => {
    let stub: sinon.SinonStub;
    
    beforeEach(() => stub = sinon.stub(loginUserUseCase, 'execute'));
    afterEach(() => stub.restore());

    it('should throw an error when there is no email field or is blank', async () => {
      stub.restore();

      const sut = new ExpressLoginController(loginUserUseCase);
      const body = {
        password: 'my_secret_password'
      } as LoginUserRequestDTO
  
      const result = await testController(sut.handle, { body });

      expect(result.spies.next).to.have.been.called;
      expect(result.error)
        .to.be.instanceOf(HttpError)
        .and.to.have.deep.property('message', 'All fields must be filled');
    });

    it('should throw an error when there is no password field or is blank', async () => {
      stub.restore();

      const sut = new ExpressLoginController(loginUserUseCase);
      const body = {
        email: 'test@test.com'
      } as LoginUserRequestDTO
  
      const result = await testController(sut.handle, { body });
      
      expect(result.spies.next).to.have.been.called;
      expect(result.error)
        .to.be.instanceOf(HttpError)
        .and.to.have.deep.property('message', 'All fields must be filled');
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
      expect(stub).to.have.been.calledWith(body);
    });

    it('should pass an error to error handler middleware when email is incorrect error is threw', async () => {
      stub.rejects(new IncorrectEmailError());

      const sut = new ExpressLoginController(loginUserUseCase);
      const body: LoginUserRequestDTO = {
        email: 'test123@test.com',
        password: 'my_secret_password',
      }
  
      const result = await testController(sut.handle, { body });
      
      expect(result.spies.next).to.have.been.called;
      expect(result.error)
        .to.be.instanceOf(HttpError)
        .and.to.have.deep.property('message', 'Incorrect email or password');
      expect(stub).to.have.been.calledWith(body);
      expect(result.spies.next).to.have.been.called;
    });

    it('should pass an error to error handler middleware when password is incorrect error is threw', async () => {
      stub.rejects(new IncorrectPasswordError());

      const sut = new ExpressLoginController(loginUserUseCase);
      const body: LoginUserRequestDTO = {
        email: 'test@test.com',
        password: 'my_secret_password1234',
      }
  
      const result = await testController(sut.handle, { body });

      expect(result.spies.next).to.have.been.called;
      expect(result.error)
        .to.be.instanceOf(HttpError)
        .and.to.have.deep.property('message', 'Incorrect email or password');
      expect(stub).to.have.been.calledWith(body);
      expect(result.spies.next).to.have.been.called;
    });


    it('should pass an error to error handler middleware when a unknown error happen', async () => {
      stub.rejects(new UnknownError());

      const sut = new ExpressLoginController(loginUserUseCase);
      const body: LoginUserRequestDTO = {
        email: 'test@test.com',
        password: 'my_secret_password',
      }

      const result = await testController(sut.handle, { body });

      expect(result.error).to.be.instanceOf(Error);
      expect(result.spies.next).to.have.been.called;
    });
  });
});
