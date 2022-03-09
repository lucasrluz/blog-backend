import { error, success } from '../../../../shared/response';

export function validateUsername(username: string) {
  if (!username) return error('Username should not be empty');

  return success(username);
}
