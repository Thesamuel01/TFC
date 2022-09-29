import { UseCaseError } from './use-cases-error';

export default class IncorrectPassword extends Error implements UseCaseError {
  constructor() {
    super('Incorrect password');

    this.name = 'IncorrectPassword';
  }
}
