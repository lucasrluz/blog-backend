import { findUserService } from '../../../services/user/findUserService';
import { notFound, ok } from '../util/response/httpResponse';

export async function findUserController(username: string) {
  const response = await findUserService(username);

  if (response.isError()) return notFound(response.value);

  return ok(response.value);
}
