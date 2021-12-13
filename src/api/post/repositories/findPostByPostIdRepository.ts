import { prisma } from '../../../prisma/prisma';

export async function findPostByPostIdRepository(postId: string) {
  return await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });
}
