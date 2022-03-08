import { editPostService } from '../../../services/post/editPostService';
import { badRequest, notFound, ok } from '../util/response/httpResponse';

export async function editPostController(
  postId: string,
  userId: string,
  title: string,
  content: string,
) {
  const response = await editPostService(postId, userId, { title, content });

  if (response.isError()) {
    if (response.value === 'Post not found') return notFound(response.value);

    return badRequest(response.value);
  }

  return ok(response.value);
}
