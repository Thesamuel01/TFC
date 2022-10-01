import { genSaltSync, hashSync } from 'bcryptjs';
import { InvalidPasswordError } from './errors';

export default class Password {
  private constructor(
    private password: string,
  ) {}

  get value() {
    return this.password;
  }

  static create(password: string): Password {
    if (!Password.validate(password)) {
      throw new InvalidPasswordError();
    }

    const hash = this.generateHash(password);

    return new Password(hash);
  }

  static validate(password: string): boolean {
    if (password.length < 6) {
      return false;
    }

    return true;
  }

  private static generateHash(password: string): string {
    const salt = genSaltSync();
    const hash = hashSync(password, salt);

    return hash;
  }
}
