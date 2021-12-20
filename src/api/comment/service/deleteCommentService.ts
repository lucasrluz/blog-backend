import { createResponse } from '../../../response/createResponse';
import { deleteCommentRepository } from '../repositories/deleteCommentRepository';
import { findCommentByCommentIdUserIdRepository } from '../repositories/findCommentByCommentIdUserIdRepository';

export async function deleteCommentService(commentId: string, userId: string) {
  const existingComment = await findCommentByCommentIdUserIdRepository(
    commentId,
    userId,
  );

  if (!existingComment)
    return createResponse(404, { message: 'Comment not found' });

  await deleteCommentRepository(commentId);

  return createResponse(200, { message: 'Successfully deleted comment' });
}
