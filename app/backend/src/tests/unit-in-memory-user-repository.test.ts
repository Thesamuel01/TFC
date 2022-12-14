import * as sinon from 'sinon';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import InMemoryUserRepository from '../repositories/in-memory/in-memory-user-repository';
import { UserDataDTO } from '../DTOs';

const { expect } = chai;
chai.use(chaiAsPromised);

describe('In memory user repository', () => {
  it('should be able to search by email and return user data', async () => {
    const sut = new InMemoryUserRepository();
    const email = 'test@test.com';
    const user: UserDataDTO = {
      id: 1,
      email: 'test@test.com',
      username: 'test123',
      role: 'user',
      password: 'secret_password',
    };    

    await expect(sut.findByEmail(email)).to.eventually.be.eql(user);
  });
});
