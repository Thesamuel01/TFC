import * as sinon from 'sinon';
import * as chai from 'chai';

import { User } from '../entities';
import { UserDataDTO } from '../DTOs';

const { expect } = chai;

describe('User domain entity', () => {
  it('should able to create a user', () => {
    const userData: UserDataDTO = {
      id: 1,
      email: 'teste@teste.com',
      username: 'teste@12',
      role: 'user',
      password: '324y239yrh2',
    }

    const user = User.create(userData);

    expect(user).to.be.an.instanceof(User);
  });

  it('should not able to create a user with a invalid email', () => {
    const user: UserDataDTO = {
      id: 1,
      email: 'teste_teste.com',
      username: 'teste@12',
      role: 'user',
      password: '324y239yrh2',
    }

    expect(() => {
      return User.create(user);
    }).to.throw();
  });

  it('should not able to create a user with a invalid password', () => {
    const user: UserDataDTO = {
      id: 1,
      email: 'teste@teste.com',
      username: 'teste@12',
      role: 'user',
      password: '38&h',
    }

    expect(() => {
      return User.create(user);
    }).to.throw();
  });

  it('should create a hash that cannot be equal to password', () => {
    const user: UserDataDTO = {
      id: 1,
      email: 'teste@teste.com',
      username: 'teste@12',
      role: 'user',
      password: '324y239yrh2',
    }

    const sut = User.create(user)

    expect(sut).to.have.property('passwordHash');
    expect(sut.passwordHash.value).to.be.a('string');
    expect(sut.passwordHash.value).to.not.be.equal(user.password);
  });
});
