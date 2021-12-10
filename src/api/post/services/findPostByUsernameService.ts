import { createResponse } from '../../../response/createResponse';
import { findUserByUsernameRepository } from '../../user/repositories/findUserByUsernameRepository';
import { findPostByUsernameRepository } from '../repositories/findPostByUsernameRepository';

export async function findPostByUsernameService(username: string) {
  const existingUser = await findUserByUsernameRepository(username);

  if (!existingUser) return createResponse(404, { message: 'User not found' });

  const existingPost = await findPostByUsernameRepository(username);

  if (existingPost.length === 0)
    return createResponse(404, { message: 'Posts not found' });

  return createResponse(200, { object: existingPost });
}
