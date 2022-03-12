import { error, success } from '../../../../shared/response';

export function validateTitle(title: string) {
  if (!title) return error('Title should not be empty');

  return success(title);
}
