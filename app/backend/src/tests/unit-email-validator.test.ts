import * as sinon from 'sinon';
import * as chai from 'chai';

import { Email } from '../entities';

const { expect } = chai;

describe('Email validator', () => {
  it('should return true when a valid email is pass by parameters', () => {
    const email =  'teste@teste.com';
    const sut = Email.validate(email);

    expect(sut).to.be.be.equal(true);
  });

  it('should return false when an invalid email is pass by parameters', () => {
    const email = 'test_test.com'
    const sut = Email.validate(email);

    expect(sut).to.be.be.equal(false);
  });

  it('should return email value when call value', () => {
    const email = 'test@test.com'
    const sut = Email.create(email);

    expect(sut.value).to.be.be.equal(email);
  });
});
