import { PasswordHashing } from '../../adapters/password-hashing';

export default class PasswordHashingAdapterMock implements PasswordHashing {
  check(password: string, hash: string): boolean {
    return password === hash;
  }
  generate(): string {
    return 'hash_password_string';
  }
}