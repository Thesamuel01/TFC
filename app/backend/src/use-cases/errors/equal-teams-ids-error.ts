import { UseCaseError } from './use-cases-error';

export default class EqualTeamsIDsError extends Error implements UseCaseError {
  constructor() {
    super('Home and away team have the same ID');

    this.name = 'EqualTeamsIDsError';
  }
}
