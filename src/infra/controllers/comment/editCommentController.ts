import { editCommentService } from '../../../services/comment/editCommentService';
import { badRequest, notFound, ok } from '../util/response/httpResponse';

export async function editCommentController(
  commentId: string,
  userId: string,
  postId: string,
  content: string,
) {
  const response = await editCommentService(commentId, userId, postId, content);

  if (response.isError()) {
    if (response.value === 'Comment not found') return notFound(response.value);

    return badRequest(response.value);
  }

  return ok(response.value);
}
