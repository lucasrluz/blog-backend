import { prisma } from '../../../prisma/prisma';

export async function findUserByUsernameAndIdRepository(
  username: string,
  userId: string,
) {
  return await prisma.user.findFirst({
    where: {
      id: {
        not: userId,
      },
      username,
    },
  });
}
