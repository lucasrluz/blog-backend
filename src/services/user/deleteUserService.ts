import { apiResponse } from '../../infra/external/express/response/apiResponse';
import { deleteUserRepository } from '../../infra/external/prisma/repositories/userRepository';

export async function deleteUserService(userId: string) {
  await deleteUserRepository(userId);

  return apiResponse(200, { message: 'User deleted successfully' });
}
