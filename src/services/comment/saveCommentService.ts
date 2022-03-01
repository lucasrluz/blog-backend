import { validateComment } from '../../domain/comment/classValidator/validateComment';
import { IComment } from '../../domain/comment/interface/IComment';
import { apiResponse } from '../../apiResponse/apiResponse';
import { saveCommentRepository } from '../../infra/external/prisma/repositories/commentRepository';
import { findPostByPostIdRepository } from '../../infra/external/prisma/repositories/postRepository';

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
