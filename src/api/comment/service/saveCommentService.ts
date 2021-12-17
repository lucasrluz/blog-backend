import { createResponse } from '../../../response/createResponse';
import { findPostByPostIdRepository } from '../../post/repositories/findPostByPostIdRepository';
import { validateComment } from '../classValidator/validateComment';
import { IComment } from '../interface/IComment';
import { saveCommentRepository } from '../repositories/saveCommentRepository';

export async function saveCommentService(comment: IComment) {
  const commentValidation = await validateComment(comment);

  if (commentValidation)
    return createResponse(400, { message: commentValidation });

  const { postId } = comment;

  const existingPost = await findPostByPostIdRepository(postId);

  if (!existingPost) return createResponse(404, { message: 'Post not found' });

  const saveCommentResponse = await saveCommentRepository(comment);

  return createResponse(201, { object: saveCommentResponse });
}
