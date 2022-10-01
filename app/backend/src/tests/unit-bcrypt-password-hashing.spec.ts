import * as sinon from 'sinon';
import * as chai from 'chai';
import { compareSync, hashSync, genSaltSync } from 'bcryptjs';


import { Password } from '../entities';
import BCryptPasswordHashing from '../implementations/bcrypt'
// @ts-ignore
const { expect } = chai;

describe('BCrypt Implementation', () => {
  it('should return true when an password and a hash matched', () => {
    const password =  'my_secret_password';
    const salt = genSaltSync();
    const hash = hashSync(password, salt);
    const sut = new BCryptPasswordHashing();

    expect(sut.compare(password, hash)).to.be.equal(true);
  });

  it('should return false when an password and a hash not matched', () => {
    const password = 'my_s'
    const hash = '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
    const sut = new BCryptPasswordHashing();


    expect(sut.compare(password, hash)).to.be.equal(false);
  });
});
