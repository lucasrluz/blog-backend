import { error, success } from '../../../shared/response';
import { IPost } from '../interface/IPost';

export function validatePost(post: IPost) {
  if (!post.title) return error('Title should not be empty');

  if (!post.content) return error('Content should not be empty');

  if (!post.userId) return error('UserId should not be empty');

  return success(post);
}
