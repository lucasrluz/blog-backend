import { error, success } from '../../shared/response';
import { IUser } from './interface/IUser';
import { validateUser } from './validate/validateUser';
import { Email } from './Email';
import { Password } from './Password';
import { Username } from './Username';

export class User {
  username: Username;
  email: Email;
  password: Password;

  private constructor(username: Username, email: Email, password: Password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  public static create(user: IUser) {
    const successOrError = validateUser(user);

    if (successOrError.isError()) return error(successOrError.value);

    return success(
      new User(
        successOrError.value.username,
        successOrError.value.email,
        successOrError.value.password,
      ),
    );
  }
}
