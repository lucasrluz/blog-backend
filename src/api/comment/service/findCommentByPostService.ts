import { createResponse } from '../../../response/createResponse';
import { findPostByPostIdRepository } from '../../post/repositories/findPostByPostIdRepository';
import { findCommentByPostRepository } from '../repositories/findCommentByPostRepository';

export async function findCommentByPostService(postId: string) {
  const existingPost = await findPostByPostIdRepository(postId);

  if (!existingPost) return createResponse(404, { message: 'Post not found' });

  const existingComment = await findCommentByPostRepository(postId);

  if (existingComment.length === 0)
    return createResponse(404, { message: 'Comments not found' });

  return createResponse(200, { object: existingComment });
}
