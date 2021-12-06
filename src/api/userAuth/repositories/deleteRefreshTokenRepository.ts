import { prisma } from '../../../prisma/prisma';

export async function deleteRefreshTokenRepository(refreshTokenId: string) {
  return await prisma.refreshToken.deleteMany({
    where: {
      id: refreshTokenId,
    },
  });
}
