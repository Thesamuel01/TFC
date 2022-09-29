import { UserRepository } from '../../repositories/user-repository';
import { LoginUserRequestDTO } from '../../DTOs/login-user-request-dto';
import Email from '../../entities/email';
import Password from '../../entities/password';
import { TokenDTO } from '../../DTOs/token-dto';
import { PasswordHashing } from '../../adapters/password-hashing';
import InvalidPasswordError from '../../entities/errors/invalid-password';
import IncorrectEmail from '../errors/incorrect-email-error';

export type LoginUserResponse = TokenDTO;

export default class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private passwordHashingAdapter: PasswordHashing,
  ) {}

  async execute(data: LoginUserRequestDTO): Promise<LoginUserResponse> {
    Email.validate(data.email);
    Password.validate(data.password);

    const userExists = await this.userRepository.findByEmail(data.email);

    if (!userExists) {
      throw new IncorrectEmail();
    }

    const isUser = this.passwordHashingAdapter.check(data.password, userExists.password);

    if (isUser) {
      throw new InvalidPasswordError();
    }

    const token = this.passwordHashingAdapter.generate();

    return { token };
  }
}
