import { findCommentByPostRepository } from '../../infra/external/prisma/repositories/commentRepository';
import { findPostByPostIdRepository } from '../../infra/external/prisma/repositories/postRepository';
import { error, success } from '../../shared/response';

export async function findCommentByPostService(postId: string) {
  const existingPost = await findPostByPostIdRepository(postId);

  if (!existingPost) return error('Post not found');

  const existingComment = await findCommentByPostRepository(postId);

  if (existingComment.length === 0) return error('Comments not found');

  return success(existingComment);
}
