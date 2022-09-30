import { TokenHashing } from "../../adapters";
import { ITokenPayload } from "../../adapters/token-hashing";

export default class TokenHashingAdapterMock implements TokenHashing {
  generate(payload: ITokenPayload): string {
    return `${payload.id}${payload.role}${payload.email}`
  }
}