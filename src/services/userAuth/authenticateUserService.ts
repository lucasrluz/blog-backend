import { compare } from 'bcrypt';
import { generateToken } from '../../infra/external/jsonwebtoken/generateToken';
import { findUserByUsernameRepository } from '../../infra/external/prisma/repositories/userRepository';
import {
  deleteRefreshTokenRepository,
  generateRefreshTokenRepository,
} from '../../infra/external/prisma/repositories/userAuthRepository';
import { error, success } from '../../shared/response';

export async function authenticateUserService(
  username: string,
  password: string,
) {
  if (!username) return error('Username should not be empty');

  if (!password) return error('Password should not be empty');

  const existingUser = await findUserByUsernameRepository(username);

  if (!existingUser) return error('Username or password incorrect');

  const passwordMatch = await compare(password, existingUser.password);

  if (!passwordMatch) return error('Username or password incorrect');

  const token = generateToken(existingUser.id);

  await deleteRefreshTokenRepository(existingUser.id);

  const refreshToken = await generateRefreshTokenRepository(existingUser.id);

  return success({ token, refreshToken });
}
