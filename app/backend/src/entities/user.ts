import Email from './email';
import Password from './password';

export interface ICreateUserData {
  readonly email: string;
  readonly password: string;
  readonly id?: number;
  readonly role: string;
  readonly username: string;
}

export default class User {
  public id?: number | undefined;
  public readonly email: Email;
  public readonly password: Password;
  public readonly role: string;
  public readonly username: string;

  private constructor(props: User) {
    if (props.id) {
      this.id = props.id;
    }

    this.email = props.email;
    this.password = props.password;
    this.role = props.role;
    this.username = props.username;
  }

  static create(props: ICreateUserData) {
    const emailOrError: Email = Email.create(props.email);
    const passwordOrError: Password = Password.create(props.password);

    return new User({
      id: props.id,
      email: emailOrError,
      password: passwordOrError,
      role: props.role,
      username: props.username,
    });
  }
}
