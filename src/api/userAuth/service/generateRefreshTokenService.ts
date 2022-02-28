import { generateToken } from '../../../providers/generateToken';
import { apiResponse } from '../../../apiResponse/apiResponse';
import dayjs from 'dayjs';
import {
  deleteRefreshTokenRepository,
  findRefreshTokenByIdRepository,
  generateRefreshTokenRepository,
} from '../../../infra/external/prisma/repositories/userAuthRepository';

export async function generateRefreshTokenService(refreshTokenId: string) {
  const existingRefreshToken = await findRefreshTokenByIdRepository(
    refreshTokenId,
  );

  if (!existingRefreshToken)
    return apiResponse(400, { message: 'Refresh token invalid' });

  const token = generateToken(existingRefreshToken.userId);

  const refreshTokenExpired = dayjs().isAfter(
    dayjs.unix(existingRefreshToken.expiresIn),
  );

  if (refreshTokenExpired) {
    await deleteRefreshTokenRepository(refreshTokenId);

    const refreshToken = await generateRefreshTokenRepository(
      existingRefreshToken.userId,
    );

    return apiResponse(200, { object: { token, refreshToken } });
  }

  return apiResponse(200, {
    object: { token, refreshToken: existingRefreshToken },
  });
}
