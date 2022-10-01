import * as sinon from 'sinon';
import * as chai from 'chai';
import { sign } from 'jsonwebtoken';
import 'dotenv/config';

import JWTTokenHashing from '../implementations/jwt'
import { ITokenPayload } from '../adapters/token-hashing';
// @ts-ignore
const { expect } = chai;

describe('JWT Implementation', () => {
  describe('generate', () => {
    it('should return a token when a payload is passed', () => {
      const tokenPayload: ITokenPayload =  {
        id: 1,
        role: 'admin',
        email: 'test@test.com',
      };
      const sut = new JWTTokenHashing();
  
      expect(sut.generate(tokenPayload)).to.be.a('string');
    });
  });

  describe('validate', () => {
    it('should return a payload when a valid token is passed', () => {
      const tokenPayload = { id: 1, role: 'admin', email: 'test@test.com' }
      const token = sign(tokenPayload, process.env.JWT_SECRET as string, { expiresIn: '1d' })
      
      const sut = new JWTTokenHashing();
  
      expect(sut.validate(token)).to.have.property('id').to.be.equal(tokenPayload.id);
      expect(sut.validate(token)).to.have.property('role').to.be.equal(tokenPayload.role);
      expect(sut.validate(token)).to.have.property('email').to.be.equal(tokenPayload.email);
    });
  
    it('should return null when an expired token is passed',async () => {
      const tokenPayload = { id: 1, role: 'admin', email: 'test@test.com' }
      const token = sign(tokenPayload, process.env.JWT_SECRET as string, { expiresIn: '1ms' })

      const sut = await new Promise((resolve, _reject) => {
        setTimeout(() => {
          const jwt = new JWTTokenHashing();
  
          resolve(jwt.validate(token));
        }, 200)
      })

      expect(sut).to.be.equal(null);
    });
  });
});
