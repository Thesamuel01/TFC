import InvalidEmailError from './errors/invalid-email';

export default class Email {
  private constructor(
    private email: string,
  ) {}

  get value(): string {
    return this.email;
  }

  static create(email: string): Email {
    if (!Email.validate(email)) {
      throw new InvalidEmailError();
    }

    return new Email(email);
  }

  static validate(email: string): boolean {
    const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    const isValid = emailRegex.test(email);

    return isValid;
  }
}
