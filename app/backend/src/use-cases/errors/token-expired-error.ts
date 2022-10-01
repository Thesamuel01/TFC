import { UseCaseError } from './use-cases-error';

export default class TokenExpiredError extends Error implements UseCaseError {
  constructor() {
    super('Token expired');

    this.name = 'TokenExpiredError';
  }
}
