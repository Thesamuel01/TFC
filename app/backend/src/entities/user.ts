import { UserDataDTO } from '../DTOs/user-data-dto';
import Email from './email';
import Password from './password';

export interface IUser {
  email: Email;
  password: Password;
  id?: number;
  role: string;
  username: string;
}

export default class User {
  private readonly _email: Email;
  private readonly _password: Password;
  private readonly _id?: number;
  private readonly _role: string;
  private readonly _username: string;

  private constructor(props: IUser) {
    this._id = props.id;
    this._email = props.email;
    this._password = props.password;
    this._role = props.role;
    this._username = props.username;
  }

  static create(props: UserDataDTO) {
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

  public get email() : string {
    return this._email.value;
  }

  public get id() : number | undefined {
    return this._id;
  }

  public get password() : string {
    return this._password.value;
  }

  public get role() : string {
    return this._role;
  }

  public get username() : string {
    return this._username;
  }
}
