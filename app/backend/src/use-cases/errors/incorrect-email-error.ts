import { UseCaseError } from './use-cases-error';

export default class IncorrectEmail extends Error implements UseCaseError {
  constructor() {
    super('Incorrect email');

    this.name = 'IncorrectEmail';
  }
}
