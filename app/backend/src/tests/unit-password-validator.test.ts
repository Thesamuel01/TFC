import * as sinon from 'sinon';
import * as chai from 'chai';

import { Password } from '../entities';

const { expect } = chai;

describe('Password validator', () => {
  it('should return true when an valid password is pass by parameters', () => {
    const password =  'my_secret_password';
    const sut = Password.validate(password);

    expect(sut).to.be.equal(true);
  });

  it('should return false when password length is less than 6 characters', () => {
    const password = 'my_s'
    const sut = Password.validate(password);

    expect(sut).to.be.equal(false);
  });
});
