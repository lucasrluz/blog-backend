import { apiResponse } from '../../infra/external/express/response/apiResponse';
import { findPostByTitleUsernamePostIdRepository } from '../../infra/external/prisma/repositories/postRepository';
import { findUserByUsernameRepository } from '../../infra/external/prisma/repositories/userRepository';

export async function findPostService(
  postId: string,
  title: string,
  username: string,
) {
  const existingUser = await findUserByUsernameRepository(username);

  if (!existingUser) return apiResponse(404, { message: 'User not found' });

  const existingPost = await findPostByTitleUsernamePostIdRepository(
    postId,
    title,
    existingUser.id,
  );

  if (!existingPost) return apiResponse(404, { message: 'Post not found' });

  return apiResponse(200, { object: existingPost });
}
