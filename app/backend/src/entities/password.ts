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

    return new Password(password);
  }

  static validate(password: string): boolean {
    if (password.length < 6) {
      return false;
    }

    return true;
  }
}
