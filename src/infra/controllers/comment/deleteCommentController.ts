import { deleteCommentService } from '../../../services/comment/deleteCommentService';
import { notFound, ok } from '../util/response/httpResponse';

export async function deleteCommentController(
  userId: string,
  commentId: string,
) {
  const response = await deleteCommentService(commentId, userId);

  if (response.isError()) return notFound(response.value);

  return ok(response.value);
}
