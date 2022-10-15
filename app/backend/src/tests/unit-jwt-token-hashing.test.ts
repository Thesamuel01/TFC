import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

import JWTTokenHashing from '../implementations/jwt'
import { ITokenPayload } from '../adapters/token-hashing';

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
      const tokenPayload = {id: 1, role: 'admin', email: 'test@test.com' }
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string, { expiresIn: '1d' })
      
      const sut = new JWTTokenHashing();
      const result = sut.validate(token);

      expect(result).to.have.property('isValid').to.be.equal(true);
      expect(result).to.have.property('isExpired').to.be.equal(false);
    
      expect(result).to.have.property('value');
      expect(result?.value).to.have.property('id').to.be.equal(1)
      expect(result?.value).to.have.property('role').to.be.equal('admin')
      expect(result?.value).to.have.property('email').to.be.equal('test@test.com')
    });
  
    it('should return an object with value key being null and isValid being true when a invalid token is passed',async () => {
      const sut = new JWTTokenHashing();
      const result = sut.validate('invalid_token')

      expect(result).to.have.property('value').to.be.equal(null);
      expect(result).to.have.property('isValid').to.be.equal(false);
      expect(result).to.not.have.property('isExpired');
    });

    it('should return an object with value key being null, isValid key being true and isExpired key being true when a expired token is passed',async () => {
      const tokenPayload = { id: 1, role: 'admin', email: 'test@test.com' }
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string, { expiresIn: '1ms' })

      const sut = await new Promise((resolve, _reject) => {
        setTimeout(() => {
          const jwt = new JWTTokenHashing();
  
          resolve(jwt.validate(token));
        }, 200)
      })

      expect(sut).to.have.property('value').to.be.equal(null);
      expect(sut).to.have.property('isValid').to.be.equal(true);
      expect(sut).to.have.property('isExpired').to.be.equal(true);
    });

    it('should return void when an unknown error occurs',async () => {
      const stub = sinon.stub(jwt, 'verify').throws(new Error('Unexpected error'));
      const logFn = sinon.stub(console, 'error');

      const tokenPayload = { id: 1, role: 'admin', email: 'test@test.com' }
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string, { expiresIn: '1ms' })

      const sut = await new Promise((resolve, _reject) => {
        setTimeout(() => {
          const jwt = new JWTTokenHashing();
  
          resolve(jwt.validate(token));
        }, 200)
      })

      expect(sut).to.be.equal(undefined);
      sinon.assert.calledOnce(logFn)

      stub.restore();
      logFn.restore();
    });
  });
});
