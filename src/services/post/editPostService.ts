import { validatePost } from '../../domain/post/classValidator/validatePost';
import {
  editPostRepository,
  findPostByPostIdAndUserIdRepository,
} from '../../infra/external/prisma/repositories/postRepository';
import { error, success } from '../../shared/response';

export async function editPostService(
  postId: string,
  userId: string,
  data: {
    title: string;
    content: string;
  },
) {
  const { title, content } = data;

  const post = {
    title,
    content,
    userId,
  };

  const postValidation = await validatePost(post);

  if (postValidation) return error(postValidation);

  const existingPost = await findPostByPostIdAndUserIdRepository(
    postId,
    userId,
  );

  if (!existingPost) return error('Post not found');

  const editResponse = await editPostRepository(postId, title, content);

  return success(editResponse);
}
