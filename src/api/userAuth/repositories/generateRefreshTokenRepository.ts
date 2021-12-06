import dayjs from 'dayjs';
import { prisma } from '../../../prisma/prisma';

export async function generateRefreshTokenRepository(userId: string) {
  const expiresIn = dayjs().add(15, 'second').unix();

  return await prisma.refreshToken.create({ data: { expiresIn, userId } });
}
