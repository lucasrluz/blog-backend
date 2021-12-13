import { createResponse } from '../../../response/createResponse';
import { deletePostRepository } from '../repositories/deletePostRepository';
import { findPostByPostIdRepository } from '../repositories/findPostByPostIdRepository';

export async function deletePostService(postId: string) {
  const existingPost = await findPostByPostIdRepository(postId);

  if (!existingPost) return createResponse(404, { message: 'Post not found' });

  await deletePostRepository(postId);

  return createResponse(200, { message: 'Post deleted successfully' });
}
