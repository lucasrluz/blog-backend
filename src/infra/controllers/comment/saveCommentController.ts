import { saveCommentService } from '../../../services/comment/saveCommentService';
import { badRequest, created, notFound } from '../util/response/httpResponse';

export async function saveCommentController(
  userId: string,
  content: string,
  postId: string,
) {
  const response = await saveCommentService({ content, userId, postId });

  if (response.isError()) {
    if (response.value === 'Post not found') return notFound(response.value);

    return badRequest(response.value);
  }

  return created(response.value);
}
