import { createResponse } from '../../../response/createResponse';
import { validatePost } from '../classValidator/validatePost';
import { editPostRepository } from '../repositories/editPostRepository';
import { findPostByPostIdAndUserIdRepository } from '../repositories/findPostByPostIdAndUserIdRepository';

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

  if (postValidation) return createResponse(400, { message: postValidation });

  const existingPost = await findPostByPostIdAndUserIdRepository(
    postId,
    userId,
  );

  if (!existingPost) return createResponse(404, { message: 'Post not found' });

  const editResponse = await editPostRepository(postId, title, content);

  return createResponse(200, { object: editResponse });
}
