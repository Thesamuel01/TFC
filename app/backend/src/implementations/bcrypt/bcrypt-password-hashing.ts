import { compareSync } from 'bcryptjs';
import { PasswordHashing } from '../../adapters';

export default class BCryptPasswordHashing implements PasswordHashing {
  constructor(
    private check = compareSync,
  ) {}

  compare(password: string, hash: string): boolean {
    return this.check(password, hash);
  }
}
