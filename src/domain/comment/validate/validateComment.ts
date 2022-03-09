import { error, success } from '../../../shared/response';
import { IComment } from '../interface/IComment';

export function validateComment(comment: IComment) {
  if (comment.content.length === 0) return error('Content should not be empty');

  if (comment.userId.length === 0) return error('UserId should not be empty');

  if (comment.postId.length === 0) return error('PostId should not be empty');

  return success(comment);
}
