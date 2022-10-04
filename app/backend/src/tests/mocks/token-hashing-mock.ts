import { TokenHashing } from "../../adapters";
import { ITokenPayload, TokenResult } from "../../adapters/token-hashing";

export default class TokenHashingAdapterMock implements TokenHashing {
  validate(token: string): TokenResult | void {
    if (token) {
      return {
        value: {
          id: 1,
          role: 'user',
          email: 'test@test.com',
        },
        isValid: true,
        isExpired: false,
      }
    }
  }

  generate(payload: ITokenPayload): string {
    return `${payload.id}${payload.role}${payload.email}`
  }
}