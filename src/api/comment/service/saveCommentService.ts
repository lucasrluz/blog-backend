import { apiResponse } from '../../../apiResponse/apiResponse';
import { findPostByPostIdRepository } from '../../post/repositories/findPostByPostIdRepository';
import { validateComment } from '../classValidator/validateComment';
import { IComment } from '../interface/IComment';
import { saveCommentRepository } from '../repositories/saveCommentRepository';

export async function saveCommentService(comment: IComment) {
  const commentValidation = await validateComment(comment);

  if (commentValidation)
    return apiResponse(400, { message: commentValidation });

  const { postId } = comment;

  const existingPost = await findPostByPostIdRepository(postId);

  if (!existingPost) return apiResponse(404, { message: 'Post not found' });

  const saveCommentResponse = await saveCommentRepository(comment);

  return apiResponse(201, { object: saveCommentResponse });
}
