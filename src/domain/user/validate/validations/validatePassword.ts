import { error, success } from '../../../../shared/response';

export function validatePassword(password: string) {
  if (!password) return error('Password should not be empty');

  return success(password);
}
