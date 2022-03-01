import { apiResponse } from '../../infra/external/express/response/apiResponse';
import {
  deleteCommentRepository,
  findCommentByCommentIdUserIdRepository,
} from '../../infra/external/prisma/repositories/commentRepository';

export async function deleteCommentService(commentId: string, userId: string) {
  const existingComment = await findCommentByCommentIdUserIdRepository(
    commentId,
    userId,
  );

  if (!existingComment)
    return apiResponse(404, { message: 'Comment not found' });

  await deleteCommentRepository(commentId);

  return apiResponse(200, { message: 'Successfully deleted comment' });
}
