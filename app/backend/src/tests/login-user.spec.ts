import * as sinon from 'sinon';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { UserDataDTO } from '../DTOs/user-data-dto';
import LoginUser from '../use-cases/login-user/login-user';
import InMemoryUserRepository from '../repositories/in-memory/in-memory-user-repository';
import passwordHashingAdapterMock from './mocks/password-hashing-mock';
import { InvalidEmailError, InvalidPasswordError} from '../entities/errors';
import { IncorrectEmailError, IncorrectPasswordError } from '../use-cases/errors';

// @ts-ignore

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Login use case', () => {
  let userRepository: InMemoryUserRepository;
  let passwordHashingAdapter: passwordHashingAdapterMock;
  let loginUseCase: LoginUser;
  
  before(() => {
    userRepository = new InMemoryUserRepository()
    passwordHashingAdapter = new passwordHashingAdapterMock()
    loginUseCase = new LoginUser(userRepository, passwordHashingAdapter)
  })

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
