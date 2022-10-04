import { UseCaseError } from './use-cases-error';

export default class NotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Item not found');

    this.name = 'NotFoundError';
  }
}
