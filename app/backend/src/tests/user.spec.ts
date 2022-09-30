import * as sinon from 'sinon';
import * as chai from 'chai';

import { User } from '../entities';
import { ICreateUserData } from '../entities/user';
// @ts-ignore
const { expect } = chai;

describe('User domain entity', () => {
  it('should able to create a user', () => {
    const userData: ICreateUserData = {
      email: 'teste@teste.com',
      username: 'teste@12',
      role: 'user',
      password: '324y239yrh2',
    }

    const user = User.create(userData);

    expect(user).to.be.an.instanceof(User);
  });

  it('should not able to create a user with a invalid email', () => {
    const user: ICreateUserData = {
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
    const user: ICreateUserData = {
      email: 'teste@teste.com',
      username: 'teste@12',
      role: 'user',
      password: '38&h',
    }

    expect(() => {
      return User.create(user);
    }).to.throw();
  });
});
