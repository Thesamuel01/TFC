import * as sinon from 'sinon';
import * as chai from 'chai';

import SequelizeUserReposiroty from '../implementations/sequelize'
import { UserDataDTO } from '../DTOs';
import User from '../database/models/User';

// @ts-ignore
const { expect } = chai;

describe('Sequelize user repository implementation', () => {
  let spy: sinon.SinonStub;

  before(() => {
    spy = sinon.stub(User, 'findOne').resolves({
      id: 1,
      email: 'teste@teste.com',
      username: 'teste@12',
      role: 'user',
      password: '324y239yrh2',
    } as User)
  })

  after(() => spy.restore())

  describe('findByEmail', () => {
    it('should be able to search by email and return user data', async () => {
      const sut = new SequelizeUserReposiroty();
      const email = 'test@test.com';
      const data: UserDataDTO = {
        id: 1,
        email: 'teste@teste.com',
        username: 'teste@12',
        role: 'user',
        password: '324y239yrh2',
      }
  
      await expect(sut.findByEmail(email)).to.eventually.be.eql(data);
    });
  })
});
