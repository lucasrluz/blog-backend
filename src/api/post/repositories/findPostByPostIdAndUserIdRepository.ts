import { prisma } from '../../../prisma/prisma';

export async function findPostByPostIdAndUserIdRepository(
  postId: string,
  userId: string,
) {
  return await prisma.post.findFirst({
    where: {
      id: postId,
      userId,
    },
  });
}
