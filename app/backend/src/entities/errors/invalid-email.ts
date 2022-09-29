import DomainError from './domain-error';

export default class InvalidEmailError extends Error implements DomainError {
  constructor() {
    super('Incorrect email or password');

    this.name = 'InvalidEmailError';
  }
}
