import { prisma } from '../../../prisma/prisma';

export async function deletePostRepository(postId: string) {
  return await prisma.post.delete({
    where: {
      id: postId,
    },
  });
}
