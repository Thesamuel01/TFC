import * as sinon from 'sinon';
import * as chai from 'chai';
import { UserDataDTO } from '../DTOs/user-data-dto';

// import LoginUserDTO from '../DTOs/login-user-dto';
// @ts-ignore

const { expect } = chai;

describe('Login use case', () => {
  const loginUseCase = {
    execute(userData: UserDataDTO) {}
  }

  it('should login user by returning a token', () => {
    const userData: UserDataDTO = {
      id: 1,
      email: 'teste@teste.com',
      username: 'teste@12',
      role: 'user',
      password: '38&hqwerqwe',
    }

    expect(() => {
      return loginUseCase.execute(userData)
    }).to.be.be.a('string');
  });

  it('should not be able login with a invalid email', () => {
    const userData: UserDataDTO = {
      id: 1,
      email: 'teste_teste.com',
      username: 'teste@12',
      role: 'user',
      password: '38&hqwerqwe',
    }

    expect(() => {
      loginUseCase.execute(userData)
    }).to.throw()
  });

  it('should not be able login with a password length less than 6', () => {
    const userData: UserDataDTO = {
      id: 1,
      email: 'teste@teste.com',
      username: 'teste@12',
      role: 'user',
      password: '38&',
    }

    expect(() => {
      loginUseCase.execute(userData)
    }).to.throw()
  });

  it('should not be able login with a invalid email', () => {
    const userData: UserDataDTO = {
      id: 1,
      email: 'teste_teste.com',
      username: 'teste@12',
      role: 'user',
      password: '38&hqwerqwe',
    }

    expect(() => {
      loginUseCase.execute(userData)
    }).to.throw()
  });
});
