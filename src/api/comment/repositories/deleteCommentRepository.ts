import { prisma } from '../../../prisma/prisma';

export async function deleteCommentRepository(commentId: string) {
  return await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
}
