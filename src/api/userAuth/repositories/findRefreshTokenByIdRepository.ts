import { prisma } from '../../../prisma/prisma';

export async function findRefreshTokenByIdRepository(refreshTokenId: string) {
  return await prisma.refreshToken.findFirst({ where: { id: refreshTokenId } });
}
