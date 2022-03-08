import { findPostByUsernameService } from '../../../services/post/findPostByUsernameService';
import { notFound, ok } from '../util/response/httpResponse';

export async function findPostByUsernameController(username: string) {
  const response = await findPostByUsernameService(username);

  if (response.isError()) return notFound(response.value);

  return ok(response.value);
}
