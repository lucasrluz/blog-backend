import { error, success } from '../../../shared/response';
import { Email } from '../entity/Email';
import { Password } from '../entity/Password';
import { Username } from '../entity/Username';
import { IUser } from '../interface/IUser';

export function validateUser(user: IUser) {
  const usernameOrError = Username.create(user.username);
  const emailOrError = Email.create(user.email);
  const passwordOrError = Password.create(user.password);

  if (usernameOrError.isError()) return error(usernameOrError.value);

  if (emailOrError.isError()) return error(emailOrError.value);

  if (passwordOrError.isError()) return error(passwordOrError.value);

  return success({
    username: usernameOrError.value,
    email: emailOrError.value,
    password: passwordOrError.value,
  });
}
