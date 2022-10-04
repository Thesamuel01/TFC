import { UseCaseError } from './use-cases-error';

export default class InvalidTokenError extends Error implements UseCaseError {
  constructor() {
    super('Token invalid');

    this.name = 'InvalidTokenError';
  }
}
