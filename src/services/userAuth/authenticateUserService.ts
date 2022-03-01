import { compare } from 'bcrypt';
import { generateToken } from '../../infra/external/jsonwebtoken/generateToken';
import { apiResponse } from '../../infra/external/express/response/apiResponse';
import { findUserByUsernameRepository } from '../../infra/external/prisma/repositories/userRepository';
import {
  deleteRefreshTokenRepository,
  generateRefreshTokenRepository,
} from '../../infra/external/prisma/repositories/userAuthRepository';

export async function authenticateUserService(
  username: string,
  password: string,
) {
  if (!username)
    return apiResponse(400, { message: 'Username should not be empty' });

  if (!password)
    return apiResponse(400, { message: 'Password should not be empty' });

  const existingUser = await findUserByUsernameRepository(username);

  if (!existingUser)
    return apiResponse(400, { message: 'Username or password incorrect' });

  const passwordMatch = await compare(password, existingUser.password);

  if (!passwordMatch)
    return apiResponse(400, { message: 'Username or password incorrect' });

  const token = generateToken(existingUser.id);

  await deleteRefreshTokenRepository(existingUser.id);

  const refreshToken = await generateRefreshTokenRepository(existingUser.id);

  return apiResponse(200, { object: { token, refreshToken } });
}
