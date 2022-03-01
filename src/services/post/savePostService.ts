import { validatePost } from '../../domain/post/classValidator/validatePost';
import { IPost } from '../../domain/post/interface/IPost';
import { apiResponse } from '../../infra/external/express/response/apiResponse';
import { savePostRepository } from '../../infra/external/prisma/repositories/postRepository';

export async function savePostService(post: IPost) {
  const postValidation = await validatePost(post);

  if (postValidation) return apiResponse(400, { message: postValidation });

  const savePostResponse = await savePostRepository(post);

  return apiResponse(201, {
    object: { id: savePostResponse.id, title: savePostResponse.title },
  });
}
