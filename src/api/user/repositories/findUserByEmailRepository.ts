import { prisma } from '../../../prisma/prisma';

export async function findUserByEmailRepository(email: string) {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
}
