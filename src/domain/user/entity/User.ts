import { error, success } from '../../../shared/response';
import { IUser } from '../interface/IUser';
import { validateUser } from '../validate/validateUser';

export class User {
  username: string;
  email: string;
  password: string;

  private constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  public static create(user: IUser) {
    const successOrError = validateUser(user);

    if (successOrError.isError()) return error(successOrError.value);

    return success(new User(user.username, user.email, user.password));
  }
}
