import { validateComment } from '../../domain/comment/classValidator/validateComment';
import { IComment } from '../../domain/comment/interface/IComment';
import { saveCommentRepository } from '../../infra/external/prisma/repositories/commentRepository';
import { findPostByPostIdRepository } from '../../infra/external/prisma/repositories/postRepository';
import { error, success } from '../../shared/response';

export async function saveCommentService(comment: IComment) {
  const commentValidation = await validateComment(comment);

  if (commentValidation) return error(commentValidation);

  const { postId } = comment;

  const existingPost = await findPostByPostIdRepository(postId);

  if (!existingPost) return error('Post not found');

  const saveCommentResponse = await saveCommentRepository(comment);

  return success(saveCommentResponse);
}
