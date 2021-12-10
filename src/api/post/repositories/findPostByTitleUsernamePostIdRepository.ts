import { prisma } from '../../../prisma/prisma';

export async function findPostByTitleUsernamePostIdRepository(
  postId: string,
  title: string,
  userId: string,
) {
  return await prisma.post.findFirst({
    where: {
      id: postId,
      title: title,
      userId: userId,
    },
  });
}
