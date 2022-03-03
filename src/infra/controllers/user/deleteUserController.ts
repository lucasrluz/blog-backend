import { deleteUserService } from '../../../services/user/deleteUserService';
import { ok } from '../util/response/httpResponse';

export async function deleteUserController(userId: string) {
  const response = await deleteUserService(userId);

  return ok(response.value);
}
