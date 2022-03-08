import { findPostByTitleUsernamePostIdRepository } from '../../infra/external/prisma/repositories/postRepository';
import { findUserByUsernameRepository } from '../../infra/external/prisma/repositories/userRepository';
import { error, success } from '../../shared/response';

export async function findPostService(
  postId: string,
  title: string,
  username: string,
) {
  const existingUser = await findUserByUsernameRepository(username);

  if (!existingUser) return error('User not found');

  const existingPost = await findPostByTitleUsernamePostIdRepository(
    postId,
    title,
    existingUser.id,
  );

  if (!existingPost) return error('Post not found');

  return success(existingPost);
}
