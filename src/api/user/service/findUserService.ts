import { apiResponse } from '../../../apiResponse/apiResponse';
import { findUserByUsernameRepository } from '../repositories/findUserByUsernameRepository';

export async function findUserService(username: string) {
  const existingUser = await findUserByUsernameRepository(username);

  if (!existingUser) return apiResponse(404, { message: 'User not found' });

  return apiResponse(200, { object: { username: existingUser.username } });
}
