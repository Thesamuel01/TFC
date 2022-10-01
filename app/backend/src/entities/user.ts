import Email from './email';
import Password from './password';
import { UserDataDTO } from '../DTOs';

export default class User {
  public readonly id: number;
  public readonly email: Email;
  public readonly passwordHash: Password;
  public readonly role: string;
  public readonly username: string;

  private constructor(props: User) {
    this.id = props.id;
    this.email = props.email;
    this.passwordHash = props.passwordHash;
    this.role = props.role;
    this.username = props.username;
  }

  static create(props: UserDataDTO) {
    const emailOrError: Email = Email.create(props.email);
    const passwordOrError: Password = Password.create(props.password);

    return new User({
      id: props.id,
      email: emailOrError,
      passwordHash: passwordOrError,
      role: props.role,
      username: props.username,
    });
  }
}
