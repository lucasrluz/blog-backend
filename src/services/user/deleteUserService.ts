import { deleteUserRepository } from '../../infra/external/prisma/repositories/userRepository';
import { success } from '../../shared/response';

export async function deleteUserService(userId: string) {
  await deleteUserRepository(userId);

  return success('User deleted successfully');
}
