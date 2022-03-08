import { savePostService } from '../../../services/post/savePostService';
import { badRequest, created } from '../util/response/httpResponse';

export async function savePostController(
  userId: string,
  title: string,
  content: string,
) {
  const post = {
    title,
    content,
    userId,
  };

  const response = await savePostService(post);

  if (response.isError()) return badRequest(response.value);

  return created(response.value);
}
