import {
  deleteCommentRepository,
  findCommentByCommentIdUserIdRepository,
} from '../../infra/external/prisma/repositories/commentRepository';
import { error, success } from '../../shared/response';

export async function deleteCommentService(commentId: string, userId: string) {
  const existingComment = await findCommentByCommentIdUserIdRepository(
    commentId,
    userId,
  );

  if (!existingComment) return error('Comment not found');

  await deleteCommentRepository(commentId);

  return success('Successfully deleted comment');
}
