import { prisma } from '../../../prisma/prisma';

export async function findCommentByPostRepository(postId: string) {
  return await prisma.comment.findMany({
    where: {
      postId,
    },
  });
}
