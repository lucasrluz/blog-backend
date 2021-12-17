import { prisma } from '../../../prisma/prisma';
import { IComment } from '../interface/IComment';

export async function saveCommentRepository(comment: IComment) {
  const { content, userId, postId } = comment;

  return await prisma.comment.create({
    data: {
      content,
      userId,
      postId,
    },
  });
}
