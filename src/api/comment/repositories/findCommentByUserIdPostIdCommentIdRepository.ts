import { prisma } from '../../../prisma/prisma';

export async function findCommentByUserIdPostIdCommentIdRepository(
  userId: string,
  postId: string,
  commentId: string,
) {
  return await prisma.comment.findFirst({
    where: {
      id: commentId,
      userId,
      postId,
    },
  });
}
