import dayjs from 'dayjs';
import { prisma } from '../prisma';

export async function generateRefreshTokenRepository(userId: string) {
  const expiresIn = dayjs().add(15, 'second').unix();

  return await prisma.refreshToken.create({ data: { expiresIn, userId } });
}

export async function findRefreshTokenByIdRepository(refreshTokenId: string) {
  return await prisma.refreshToken.findFirst({ where: { id: refreshTokenId } });
}

export async function deleteRefreshTokenRepository(refreshTokenId: string) {
  return await prisma.refreshToken.deleteMany({
    where: {
      id: refreshTokenId,
    },
  });
}
