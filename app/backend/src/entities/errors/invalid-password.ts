import DomainError from './domain-error';

export default class InvalidPasswordError extends Error implements DomainError {
  constructor() {
    super('Incorrect email or password');

    this.name = 'InvalidPasswordError';
  }
}
