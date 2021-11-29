import { prisma } from '../../../prisma/prisma';

export async function findUserByUsernameRepository(username: string) {
  return await prisma.user.findFirst({
    where: {
      username,
    },
  });
}
