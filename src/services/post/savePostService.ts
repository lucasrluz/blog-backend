import { validatePost } from '../../domain/post/classValidator/validatePost';
import { IPost } from '../../domain/post/interface/IPost';
import { savePostRepository } from '../../infra/external/prisma/repositories/postRepository';
import { error, success } from '../../shared/response';

export async function savePostService(post: IPost) {
  const postValidation = await validatePost(post);

  if (postValidation) return error(postValidation);

  const savePostResponse = await savePostRepository(post);

  return success({ id: savePostResponse.id, title: savePostResponse.title });
}
