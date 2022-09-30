import { UserRepository } from '../../repositories/user-repository';
import { LoginUserRequestDTO } from '../../DTOs/login-user-request-dto';
import { Email, Password } from '../../entities';
import { TokenDTO } from '../../DTOs/token-dto';
import { PasswordHashing } from '../../adapters/password-hashing';
import { IncorrectEmailError, IncorrectPasswordError } from '../errors';
import { InvalidEmailError, InvalidPasswordError } from '../../entities/errors';

export type LoginUserResponse = TokenDTO;

export default class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private passwordHashingAdapter: PasswordHashing,
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

    const token = this.passwordHashingAdapter.generate();

    return { token };
  }
}
