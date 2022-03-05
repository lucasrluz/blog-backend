import dayjs from 'dayjs';
import {
  deleteRefreshTokenRepository,
  findRefreshTokenByIdRepository,
  generateRefreshTokenRepository,
} from '../../infra/external/prisma/repositories/userAuthRepository';
import { generateToken } from '../../infra/external/jsonwebtoken/generateToken';
import { error, success } from '../../shared/response';

export async function generateRefreshTokenService(refreshTokenId: string) {
  const existingRefreshToken = await findRefreshTokenByIdRepository(
    refreshTokenId,
  );

  if (!existingRefreshToken) return error('Refresh token invalid');

  const token = generateToken(existingRefreshToken.userId);

  const refreshTokenExpired = dayjs().isAfter(
    dayjs.unix(existingRefreshToken.expiresIn),
  );

  if (refreshTokenExpired) {
    await deleteRefreshTokenRepository(refreshTokenId);

    const refreshToken = await generateRefreshTokenRepository(
      existingRefreshToken.userId,
    );

    return success({ token, refreshToken });
  }

  return success({ token, refreshToken: existingRefreshToken });
}
