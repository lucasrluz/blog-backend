import { error, success } from '../../../shared/response';
import { IComment } from '../interface/IComment';

export function validateComment(comment: IComment) {
  if (!comment.content) return error('Content should not be empty');

  if (!comment.userId) return error('UserId should not be empty');

  if (!comment.postId) return error('PostId should not be empty');

  return success(comment);
}
