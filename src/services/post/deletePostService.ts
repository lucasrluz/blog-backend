import { apiResponse } from '../../infra/external/express/response/apiResponse';
import {
  deletePostRepository,
  findPostByPostIdRepository,
} from '../../infra/external/prisma/repositories/postRepository';

export async function deletePostService(postId: string) {
  const existingPost = await findPostByPostIdRepository(postId);

  if (!existingPost) return apiResponse(404, { message: 'Post not found' });

  await deletePostRepository(postId);

  return apiResponse(200, { message: 'Post deleted successfully' });
}
