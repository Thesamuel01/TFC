import * as sinon from 'sinon';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { UserDataDTO } from '../DTOs/user-data-dto';
import LoginUser from '../use-cases/login-user';
import InMemoryUserRepository from '../repositories/in-memory/in-memory-user-repository';
import { InvalidEmailError, InvalidPasswordError} from '../entities/errors';
import { IncorrectEmailError, IncorrectPasswordError, InvalidTokenError, TokenExpiredError, UnknownError } from '../use-cases/errors';
import { PasswordHashing, TokenHashing } from '../adapters';
import { PasswordHashingAdapterMock, TokenHashingAdapterMock } from './mocks';
import { TokenResult } from '../adapters/token-hashing'
// @ts-ignore

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Login use case', () => {
  let userRepository: InMemoryUserRepository;
  let tokenHashingAdapter: TokenHashing;
  let passwordHasingAdapter: PasswordHashing;
  let loginUseCase: LoginUser;
  
  before(() => {
    userRepository = new InMemoryUserRepository()
    tokenHashingAdapter = new TokenHashingAdapterMock()
    passwordHasingAdapter = new PasswordHashingAdapterMock();
    loginUseCase = new LoginUser(
      userRepository,
      tokenHashingAdapter,
      passwordHasingAdapter,
    )
  })

  describe('Login', () => {
    it('should login user by returning a token', async () => {
      const userData: UserDataDTO = {
        id: 1,
        email: 'test@test.com',
        username: 'test123',
        role: 'user',
        password: 'secret_password',
      }
  
  
      await expect(loginUseCase.execute(userData))
        .to.eventually.have.property("token")
        .to.be.a('string')
    });
  
    it('should not be able to login with a invalid email', async () => {
      const userData: UserDataDTO = {
        id: 1,
        email: 'test_test.com',
        username: 'test123',
        role: 'user',
        password: 'secret_password',
      }
  
      await expect(loginUseCase.execute(userData))
        .to.eventually
        .rejectedWith('Invalid Email')
        .and.be.an.instanceOf(InvalidEmailError);
    });
  
    it('should not be able to login with a password length less than 6', async () => {
      const userData: UserDataDTO = {
        id: 1,
        email: 'test@test.com',
        username: 'test123',
        role: 'user',
        password: 'secr',
      }
  
      await expect(loginUseCase.execute(userData))
        .to.eventually
        .rejectedWith('Invalid Password')
        .and.be.an.instanceOf(InvalidPasswordError);
    });
  
    it('should not be able to login when email is incorrect', async () => {
      const userData: UserDataDTO = {
        id: 1,
        email: 'test123@test.com',
        username: 'test123',
        role: 'user',
        password: 'secret_password',
      }
  
      await expect(loginUseCase.execute(userData))
        .to.eventually
        .rejectedWith('Incorrect email')
        .and.be.an.instanceOf(IncorrectEmailError);
    });
  
    it('should not be able to login when password is incorrect', async () => {
      const userData: UserDataDTO = {
        id: 1,
        email: 'test@test.com',
        username: 'test123',
        role: 'user',
        password: 'secret_password123',
      }
  
      await expect(loginUseCase.execute(userData))
        .to.eventually
        .rejectedWith('Incorrect password')
        .and.be.an.instanceOf(IncorrectPasswordError);
    }); 
  });

  describe('Validate', () => {
    let stub: sinon.SinonStub;
  
    beforeEach(() => {
      stub = sinon.stub(tokenHashingAdapter, 'validate');
    });

    afterEach(() => {
      stub.restore();
    })


    it('should return user role when token is valid', () => {
      const sut = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2NjQ2MDU0MTMsImV4cCI6MTY2NDY5MTgxM30.eCXKY4gyIoTEdXVkvdpy825ux8icXNpr9Lr4s-eRBxU';

      stub.callsFake((token: string) => {
        if (sut === token) {
          return { value: { id: 1, role: 'admin', email: 'admin@admin.com'}, isValid: true, isExpired: false} as TokenResult
        }

        return null
      })
  
      expect(loginUseCase.validate(sut))
        .to.have.property('role')
        .to.be.a('string')
        .to.be.equal('admin')
    });

    it('should throw an error when token is invalid', () => {
      const sut = 'invalid_token';

      stub.callsFake((token: string) => {
        if (sut === token) {
          return { value: null, isValid: false } as TokenResult
        }

        return null
      })
  
      expect(() => {
        return loginUseCase.validate('invalid_token')
      }).to.throw(InvalidTokenError)
    });

    it('should throw an error when token is expired', () => {
      const sut = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2NjQ2MDU0MTMsImV4cCI6MTY2NDY5MTgxM30.eCXKY4gyIoTEdXVkvdpy825ux8icXNpr9Lr4s-eRBxU';

      stub.callsFake((token: string) => {
        if (sut === token) {
          return { value: null, isValid: true, isExpired: true} as TokenResult
        }

        return null;
      })
  
      expect(() => {
        return loginUseCase.validate(sut)
      }).to.throw(TokenExpiredError);
    });

    it('should throw an error when an unexpected error occurs', () => {
      const sut = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2NjQ2MDU0MTMsImV4cCI6MTY2NDY5MTgxM30.eCXKY4gyIoTEdXVkvdpy825ux8icXNpr9Lr4s-eRBxU';

      stub.callsFake((_token: string) => {})
  
      expect(() => {
        return loginUseCase.validate(sut)
      }).to.throw(UnknownError);
    });
  });
})

