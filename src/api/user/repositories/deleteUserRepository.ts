import { prisma } from '../../../prisma/prisma';

export async function deleteUserRepository(userId: string) {
  await prisma.user.delete({ where: { id: userId } });
}
