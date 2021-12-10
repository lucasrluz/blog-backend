import { prisma } from '../../../prisma/prisma';

export async function findPostByUsernameRepository(username: string) {
  return await prisma.post.findMany({
    where: {
      user: {
        username,
      },
    },
  });
}
