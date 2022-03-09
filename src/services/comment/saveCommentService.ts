import { IComment } from '../../domain/comment/interface/IComment';
import { validateComment } from '../../domain/comment/validate/validateComment';
import { saveCommentRepository } from '../../infra/external/prisma/repositories/commentRepository';
import { findPostByPostIdRepository } from '../../infra/external/prisma/repositories/postRepository';
import { error, success } from '../../shared/response';

export async function saveCommentService(comment: IComment) {
  const commentOrError = await validateComment(comment);

  if (commentOrError.isError()) return error(commentOrError.value);

  const { postId } = comment;

  const existingPost = await findPostByPostIdRepository(postId);

  if (!existingPost) return error('Post not found');

  const saveCommentResponse = await saveCommentRepository(comment);

  return success(saveCommentResponse);
}
