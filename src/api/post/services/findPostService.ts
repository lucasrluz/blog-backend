import { createResponse } from '../../../response/createResponse';
import { findUserByUsernameRepository } from '../../user/repositories/findUserByUsernameRepository';
import { findPostByTitleUsernamePostIdRepository } from '../repositories/findPostByTitleUsernamePostIdRepository';

export async function findPostService(
  postId: string,
  title: string,
  username: string,
) {
  const existingUser = await findUserByUsernameRepository(username);

  if (!existingUser) return createResponse(404, { message: 'User not found' });

  const existingPost = await findPostByTitleUsernamePostIdRepository(
    postId,
    title,
    existingUser.id,
  );

  if (!existingPost) return createResponse(404, { message: 'Post not found' });

  return createResponse(200, { object: existingPost });
}
