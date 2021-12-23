import { apiResponse } from '../../../apiResponse/apiResponse';
import { deleteUserRepository } from '../repositories/deleteUserRepository';

export async function deleteUserService(userId: string) {
  await deleteUserRepository(userId);

  return apiResponse(200, { message: 'User deleted successfully' });
}
