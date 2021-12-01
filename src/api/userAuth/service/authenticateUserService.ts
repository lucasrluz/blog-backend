import { compare } from 'bcrypt';
import { generateToken } from '../../../providers/generateToken';
import { createResponse } from '../../../response/createResponse';
import { findUserByUsernameRepository } from '../../user/repositories/findUserByUsernameRepository';

export async function authenticateUserService(
  username: string,
  password: string,
) {
  const existingUser = await findUserByUsernameRepository(username);

  if (!existingUser)
    return createResponse(400, { message: 'Username or password incorrect' });

  const passwordMatch = await compare(password, existingUser.password);

  if (!passwordMatch)
    return createResponse(400, { message: 'Username or password incorrect' });

  const token = generateToken(existingUser.id);

  return createResponse(200, { object: { token } });
}
