import { authenticateUserService } from '../../../services/userAuth/authenticateUserService';
import { badRequest, ok } from '../util/response/httpResponse';

export async function authenticateUserController(
  username: string,
  password: string,
) {
  const response = await authenticateUserService(username, password);

  if (response.isError()) return badRequest(response.value);

  return ok(response.value);
}
