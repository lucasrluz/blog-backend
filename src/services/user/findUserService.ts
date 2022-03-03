import { findUserByUsernameRepository } from '../../infra/external/prisma/repositories/userRepository';
import { error, success } from '../../shared/response';

export async function findUserService(username: string) {
  const existingUser = await findUserByUsernameRepository(username);

  if (!existingUser) return error('User not found');

  return success({ username: existingUser.username });
}
