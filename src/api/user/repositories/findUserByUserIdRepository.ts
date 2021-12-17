import { prisma } from '../../../prisma/prisma';

export async function findUserByUserIdRepository(userId: string) {
  return await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
}
