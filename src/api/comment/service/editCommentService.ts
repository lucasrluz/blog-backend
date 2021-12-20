import { createResponse } from '../../../response/createResponse';
import { editCommentRepository } from '../repositories/editCommentRepository';
import { findCommentByUserIdPostIdCommentIdRepository } from '../repositories/findCommentByUserIdPostIdCommentIdRepository';

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

  if (!existingComment)
    return createResponse(404, { message: 'Comment not found' });

  if (!content)
    return createResponse(400, { message: 'content should not be empty' });

  const editCommentResponse = await editCommentRepository(commentId, content);

  return createResponse(200, { object: editCommentResponse });
}
