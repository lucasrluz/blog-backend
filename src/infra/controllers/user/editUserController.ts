import { editUserService } from '../../../services/user/editUserService';
import { badRequest, ok } from '../util/response/httpResponse';

export async function editUserController(
  userId: string,
  username: string,
  password: string,
) {
  const response = await editUserService(userId, { username, password });

  if (response.isError()) return badRequest(response.value);

  return ok(response.value);
}
