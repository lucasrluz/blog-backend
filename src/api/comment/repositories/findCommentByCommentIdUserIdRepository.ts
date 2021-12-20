import { prisma } from '../../../prisma/prisma';

export async function findCommentByCommentIdUserIdRepository(
  commentId: string,
  userId: string,
) {
  return await prisma.comment.findFirst({
    where: {
      id: commentId,
      userId,
    },
  });
}
