import { apiResponse } from '../../../apiResponse/apiResponse';
import { savePostRepository } from '../../../infra/external/prisma/repositories/postRepository';
import { validatePost } from '../classValidator/validatePost';
import { IPost } from '../interface/IPost';

export async function savePostService(post: IPost) {
  const postValidation = await validatePost(post);

  if (postValidation) return apiResponse(400, { message: postValidation });

  const savePostResponse = await savePostRepository(post);

  return apiResponse(201, {
    object: { id: savePostResponse.id, title: savePostResponse.title },
  });
}
