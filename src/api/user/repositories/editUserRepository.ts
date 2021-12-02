import { prisma } from '../../../prisma/prisma';

export async function editUserRepository(
  userId: string,
  data: { username: string; password: string },
) {
  const { username, password } = data;

  return await prisma.user.update({
    where: { id: userId },
    data: { username, password },
  });
}
