import { Secret, sign, SignOptions, verify } from 'jsonwebtoken';
import { ITokenPayload } from '../../adapters/token-hashing';
import { TokenHashing } from '../../adapters';
import 'dotenv/config';

export default class JWTTokenHashing implements TokenHashing {
  constructor(
    private secret: Secret = process.env.JWT_SECRET as string,
    private options: SignOptions = { expiresIn: '1d' },
  ) {}

  generate(payload: ITokenPayload): string {
    return sign(payload, this.secret, this.options);
  }

  validate(token: string): ITokenPayload | null {
    try {
      const tokenValues = verify(token, this.secret, this.options);

      return tokenValues as ITokenPayload;
    } catch (err) {
      return null;
    }
  }
}
