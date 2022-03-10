import { hash } from 'bcrypt';
import { Password } from '../../domain/user/entity/Password';
import { Username } from '../../domain/user/entity/Username';
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

  const usernameOrError = Username.create(username);

  if (usernameOrError.isError()) return error(usernameOrError.value);

  const passwordOrError = Password.create(password);

  if (passwordOrError.isError()) return error(passwordOrError.value);

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
