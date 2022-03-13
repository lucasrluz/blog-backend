import { error, success } from '../../../shared/response';

export function validateUserId(userId: string) {
  if (!userId) return error('UserId should not be empty');

  return success(userId);
}
