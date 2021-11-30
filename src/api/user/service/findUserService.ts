import { createResponse } from '../../../response/createResponse';
import { findUserByUsernameRepository } from '../repositories/findUserByUsernameRepository';

export async function findUserService(username: string) {
  const existingUser = await findUserByUsernameRepository(username);

  if (!existingUser) return createResponse(404, { message: 'User not found' });

  return createResponse(200, { object: { username: existingUser.username } });
}
