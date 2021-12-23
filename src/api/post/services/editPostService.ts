import { apiResponse } from '../../../apiResponse/apiResponse';
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

  if (postValidation) return apiResponse(400, { message: postValidation });

  const existingPost = await findPostByPostIdAndUserIdRepository(
    postId,
    userId,
  );

  if (!existingPost) return apiResponse(404, { message: 'Post not found' });

  const editResponse = await editPostRepository(postId, title, content);

  return apiResponse(200, { object: editResponse });
}
