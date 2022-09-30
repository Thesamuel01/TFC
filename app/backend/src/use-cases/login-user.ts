import { UserRepository } from '../repositories/user-repository';
import { LoginUserRequestDTO } from '../DTOs/login-user-request-dto';
import { Email, Password } from '../entities';
import { TokenDTO } from '../DTOs/token-dto';
import { IncorrectEmailError, IncorrectPasswordError } from './errors';
import { InvalidEmailError, InvalidPasswordError } from '../entities/errors';
import { PasswordHashing, TokenHashing } from '../adapters';

export type LoginUserResponse = TokenDTO;

export default class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private tokenHashingAdapter: TokenHashing,
    private passwordHasing: PasswordHashing,
  ) {}

  async execute(data: LoginUserRequestDTO): Promise<LoginUserResponse> {
    if (!Email.validate(data.email) || !Password.validate(data.password)) {
      throw Email.validate(data.email) ? new InvalidPasswordError() : new InvalidEmailError();
    }

    const userExists = await this.userRepository.findByEmail(data.email);

    if (!userExists) {
      throw new IncorrectEmailError();
    }

    const isPasswordCorrect = this.passwordHasing.compare(data.password, userExists.password.value);

    if (!isPasswordCorrect) {
      throw new IncorrectPasswordError();
    }

    const { id, role, email } = userExists;
    const token = this.tokenHashingAdapter.generate({ id, role, email: email.value });

    return { token };
  }
}
