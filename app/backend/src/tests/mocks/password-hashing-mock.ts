import { PasswordHashing } from '../../adapters/password-hashing';

export default class passwordHashingAdapterMock implements PasswordHashing {
  compare(password: string, hash: string): boolean {
    return password === hash;
  }
}