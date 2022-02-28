import { apiResponse } from '../../../apiResponse/apiResponse';
import { findPostByUsernameRepository } from '../../../infra/external/prisma/repositories/postRepository';
import { findUserByUsernameRepository } from '../../../infra/external/prisma/repositories/userRepository';

export async function findPostByUsernameService(username: string) {
  const existingUser = await findUserByUsernameRepository(username);

  if (!existingUser) return apiResponse(404, { message: 'User not found' });

  const existingPost = await findPostByUsernameRepository(username);

  if (existingPost.length === 0)
    return apiResponse(404, { message: 'Posts not found' });

  return apiResponse(200, { object: existingPost });
}
