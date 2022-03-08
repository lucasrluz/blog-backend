import { findPostByUsernameRepository } from '../../infra/external/prisma/repositories/postRepository';
import { findUserByUsernameRepository } from '../../infra/external/prisma/repositories/userRepository';
import { error, success } from '../../shared/response';

export async function findPostByUsernameService(username: string) {
  const existingUser = await findUserByUsernameRepository(username);

  if (!existingUser) return error('User not found');

  const existingPost = await findPostByUsernameRepository(username);

  if (existingPost.length === 0) return error('Posts not found');

  return success(existingPost);
}
