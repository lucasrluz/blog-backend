import {
  deletePostRepository,
  findPostByPostIdRepository,
} from '../../infra/external/prisma/repositories/postRepository';
import { error, success } from '../../shared/response';

export async function deletePostService(postId: string) {
  const existingPost = await findPostByPostIdRepository(postId);

  if (!existingPost) return error('Post not found');

  await deletePostRepository(postId);

  return success('Post deleted successfully');
}
