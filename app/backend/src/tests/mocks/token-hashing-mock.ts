import { TokenHashing } from "../../adapters";
import { ITokenPayload } from "../../adapters/token-hashing";

export default class TokenHashingAdapterMock implements TokenHashing {
  validate(token: string): ITokenPayload | null {
    return !token ? null : {
      id: 1,
      role: 'user',
      email: 'test@test.com',
    }
  }

  generate(payload: ITokenPayload): string {
    return `${payload.id}${payload.role}${payload.email}`
  }
}