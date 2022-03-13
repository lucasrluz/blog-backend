import { Content } from '../../domain/shared/Content';
import {
  editCommentRepository,
  findCommentByUserIdPostIdCommentIdRepository,
} from '../../infra/external/prisma/repositories/commentRepository';
import { error, success } from '../../shared/response';

export async function editCommentService(
  commentId: string,
  userId: string,
  postId: string,
  content: string,
) {
  const existingComment = await findCommentByUserIdPostIdCommentIdRepository(
    userId,
    postId,
    commentId,
  );

  if (!existingComment) return error('Comment not found');

  const contentOrError = Content.create(content);

  if (contentOrError.isError()) return error(contentOrError.value);

  const editCommentResponse = await editCommentRepository(commentId, content);

  return success(editCommentResponse);
}
