import { createResponse } from '../../../response/createResponse';
import { deleteUserRepository } from '../repositories/deleteUserRepository';

export async function deleteUserService(userId: string) {
  await deleteUserRepository(userId);

  return createResponse(200, { message: 'User deleted successfully' });
}
