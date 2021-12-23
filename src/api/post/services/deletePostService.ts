import { apiResponse } from '../../../apiResponse/apiResponse';
import { deletePostRepository } from '../repositories/deletePostRepository';
import { findPostByPostIdRepository } from '../repositories/findPostByPostIdRepository';

export async function deletePostService(postId: string) {
  const existingPost = await findPostByPostIdRepository(postId);

  if (!existingPost) return apiResponse(404, { message: 'Post not found' });

  await deletePostRepository(postId);

  return apiResponse(200, { message: 'Post deleted successfully' });
}
