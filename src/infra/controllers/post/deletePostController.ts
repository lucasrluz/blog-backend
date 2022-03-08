import { deletePostService } from '../../../services/post/deletePostService';
import { notFound, ok } from '../util/response/httpResponse';

export async function deletePostController(postId: string) {
  const response = await deletePostService(postId);

  if (response.isError()) return notFound(response.value);

  return ok(response.value);
}
