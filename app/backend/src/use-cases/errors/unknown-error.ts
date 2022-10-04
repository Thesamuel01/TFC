import { UseCaseError } from './use-cases-error';

export default class UnknownError extends Error implements UseCaseError {
  constructor() {
    super('Unexpected internal error');

    this.name = 'UnknownError';
  }
}
