import { error, success } from '../../../shared/response';
import { IUser } from '../interface/IUser';
import { validateEmail } from './validations/validateEmail';
import { validatePassword } from './validations/validatePassword';
import { validateUsername } from './validations/validateUsername';

export function validateUser(user: IUser) {
  const usernameSuccessOrError = validateUsername(user.username);
  const emailSuccessOrError = validateEmail(user.email);
  const passwordSuccessOrError = validatePassword(user.password);

  if (usernameSuccessOrError.isError())
    return error(usernameSuccessOrError.value);

  if (emailSuccessOrError.isError()) return error(emailSuccessOrError.value);

  if (passwordSuccessOrError.isError())
    return error(passwordSuccessOrError.value);

  return success(user);
}
