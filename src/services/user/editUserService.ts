import { hash } from 'bcrypt';
import {
  editUserRepository,
  findUserByUsernameAndIdRepository,
} from '../../infra/external/prisma/repositories/userRepository';
import { error, success } from '../../shared/response';

export async function editUserService(
  userId: string,
  data: { username: string; password: string },
) {
  const { username, password } = data;

  if (!username) return error('Username should not be empty');

  if (!password) return error('Password should not be empty');

  const existingUser = await findUserByUsernameAndIdRepository(
    username,
    userId,
  );

  if (existingUser) return error('This username is already in use');

  const passwordHash = await hash(password, 8);

  const editUserResponse = await editUserRepository(userId, {
    username,
    password: passwordHash,
  });

  return success({
    id: editUserResponse.id,
    username: editUserResponse.username,
    email: editUserResponse.email,
  });
}
