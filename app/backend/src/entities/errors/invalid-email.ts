import { DomainError } from './domain-error';

export default class InvalidEmailError extends Error implements DomainError {
  constructor() {
    super('Invalid Email');

    this.name = 'InvalidEmailError';
  }
}
