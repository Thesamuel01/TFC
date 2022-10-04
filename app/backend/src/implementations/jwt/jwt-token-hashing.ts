import {
  JsonWebTokenError, Secret, SignOptions, TokenExpiredError,
  sign, verify,
} from 'jsonwebtoken';
import 'dotenv/config';

import { ITokenPayload, TokenResult } from '../../adapters/token-hashing';
import { TokenHashing } from '../../adapters';

export default class JWTTokenHashing implements TokenHashing {
  constructor(
    private secret: Secret = process.env.JWT_SECRET as string,
    private options: SignOptions = { expiresIn: '1d' },
  ) {}

  generate(payload: ITokenPayload): string {
    return sign(payload, this.secret, this.options);
  }

  validate(token: string): TokenResult | void {
    try {
      const result = verify(token, this.secret, this.options);

      return { value: result, isValid: true, isExpired: false } as TokenResult;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        return { value: null, isValid: true, isExpired: true };
      }

      if (err instanceof JsonWebTokenError) {
        return { value: null, isValid: false };
      }

      console.error(err);
    }
  }
}
