import { apiResponse } from '../../../apiResponse/apiResponse';
import { findPostByPostIdRepository } from '../../post/repositories/findPostByPostIdRepository';
import { findCommentByPostRepository } from '../repositories/findCommentByPostRepository';

export async function findCommentByPostService(postId: string) {
  const existingPost = await findPostByPostIdRepository(postId);

  if (!existingPost) return apiResponse(404, { message: 'Post not found' });

  const existingComment = await findCommentByPostRepository(postId);

  if (existingComment.length === 0)
    return apiResponse(404, { message: 'Comments not found' });

  return apiResponse(200, { object: existingComment });
}
