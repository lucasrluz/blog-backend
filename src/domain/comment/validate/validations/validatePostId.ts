import { error, success } from '../../../../shared/response';

export function validatePostId(postId: string) {
  if (!postId) return error('PostId should not be empty');

  return success(postId);
}
