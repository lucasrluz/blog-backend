import { prisma } from '../../../prisma/prisma';

export async function editCommentRepository(
  commentId: string,
  content: string,
) {
  return await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content,
    },
  });
}
