import { findCommentByPostService } from '../../../services/comment/findCommentByPostService';
import { notFound, ok } from '../util/response/httpResponse';

export async function findCommentByPostController(postId: string) {
  const response = await findCommentByPostService(postId);

  if (response.isError()) return notFound(response.value);

  return ok(response.value);
}
