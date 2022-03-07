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

  if (!content) return error('Content should not be empty');

  const editCommentResponse = await editCommentRepository(commentId, content);

  return success(editCommentResponse);
}
