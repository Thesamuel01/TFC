import { UserRepository } from '../../repositories/user-repository';
import { LoginUserRequestDTO } from '../../DTOs/login-user-request-dto';
import { Email, Password } from '../../entities';
import { TokenDTO } from '../../DTOs/token-dto';
import { IncorrectEmailError, IncorrectPasswordError } from '../errors';
import { InvalidEmailError, InvalidPasswordError } from '../../entities/errors';
import { PasswordHashing, TokenHashing } from '../../adapters';

export type LoginUserResponse = TokenDTO;

export default class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private passwordHashingAdapter: PasswordHashing,
    private tokenHashingAdapter: TokenHashing,
  ) {}

  async execute(data: LoginUserRequestDTO): Promise<LoginUserResponse> {
    const isEmailValid = Email.validate(data.email);
    const isPasswordValid = Password.validate(data.password);

    if (!isEmailValid || !isPasswordValid) {
      throw isPasswordValid ? new InvalidEmailError() : new InvalidPasswordError();
    }

    const userExists = await this.userRepository.findByEmail(data.email);

    if (!userExists) {
      throw new IncorrectEmailError();
    }

    const isPassworCorrect = this.passwordHashingAdapter.check(data.password, userExists.password);

    if (!isPassworCorrect) {
      throw new IncorrectPasswordError();
    }

    const { id, role, email } = userExists;
    const token = this.tokenHashingAdapter.generate({ id, role, email });

    return { token };
  }
}
