import { IPost } from '../../domain/post/interface/IPost';
import { validatePost } from '../../domain/post/validate/validatePost';
import { savePostRepository } from '../../infra/external/prisma/repositories/postRepository';
import { error, success } from '../../shared/response';

export async function savePostService(post: IPost) {
  const postOrError = validatePost(post);

  if (postOrError.isError()) return error(postOrError.value);

  const savePostResponse = await savePostRepository(post);

  return success({ id: savePostResponse.id, title: savePostResponse.title });
}
