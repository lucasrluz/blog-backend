import { apiResponse } from '../../../apiResponse/apiResponse';
import { findCommentByPostRepository } from '../../../infra/external/prisma/repositories/commentRepository';
import { findPostByPostIdRepository } from '../../../infra/external/prisma/repositories/postRepository';

export async function findCommentByPostService(postId: string) {
  const existingPost = await findPostByPostIdRepository(postId);

  if (!existingPost) return apiResponse(404, { message: 'Post not found' });

  const existingComment = await findCommentByPostRepository(postId);

  if (existingComment.length === 0)
    return apiResponse(404, { message: 'Comments not found' });

  return apiResponse(200, { object: existingComment });
}
