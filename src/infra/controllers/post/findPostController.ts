import { findPostService } from '../../../services/post/findPostService';
import { notFound, ok } from '../util/response/httpResponse';

export async function findPostController(
  postId: string,
  title: string,
  username: string,
) {
  const response = await findPostService(postId, title, username);

  if (response.isError()) return notFound(response.value);

  return ok(response.value);
}
