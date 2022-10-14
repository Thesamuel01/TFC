import { UserRepository } from '../repositories/user-repository';
import { LoginUserRequestDTO } from '../DTOs/login-user-request-dto';
import { Email, Password } from '../entities';
import { TokenDTO } from '../DTOs/token-dto';
import {
  IncorrectEmailError, IncorrectPasswordError,
  InvalidTokenError, TokenExpiredError, UnknownError,
} from './errors';
import { InvalidEmailError, InvalidPasswordError } from '../entities/errors';
import { PasswordHashing, TokenHashing } from '../adapters';
import { ITokenPayload } from '../adapters/token-hashing';

export default class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private tokenHashingAdapter: TokenHashing,
    private passwordHasing: PasswordHashing,
  ) {}

  async execute(data: LoginUserRequestDTO): Promise<TokenDTO> {
    if (!Email.validate(data.email) || !Password.validate(data.password)) {
      throw Email.validate(data.email) ? new InvalidPasswordError() : new InvalidEmailError();
    }

    const userExists = await this.userRepository.findByEmail(data.email);

    if (!userExists) {
      throw new IncorrectEmailError();
    }

    const isPasswordCorrect = this.passwordHasing.compare(data.password, userExists.password);

    if (!isPasswordCorrect) {
      throw new IncorrectPasswordError();
    }

    const { id, role, email } = userExists;
    const token = this.tokenHashingAdapter.generate({ id, role, email });

    return { token };
  }

  validate(token: string): ITokenPayload {
    const result = this.tokenHashingAdapter.validate(token);

    if (!result) {
      throw new UnknownError();
    }

    if (!result.isValid) {
      throw new InvalidTokenError();
    }

    if (result.isExpired) {
      throw new TokenExpiredError();
    }

    return result.value as ITokenPayload;
  }
}
