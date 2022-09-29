import { DomainError } from './domain-error';

export default class InvalidPasswordError extends Error implements DomainError {
  constructor() {
    super('Invalid Password');

    this.name = 'InvalidPasswordError';
  }
}
