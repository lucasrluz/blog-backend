import { hash } from 'bcrypt';
import {
  editUserRepository,
  findUserByUsernameAndIdRepository,
} from '../../infra/external/prisma/repositories/userRepository';
import { apiResponse } from '../../infra/external/express/response/apiResponse';

export async function editUserService(
  userId: string,
  data: { username: string; password: string },
) {
  const { username, password } = data;

  if (!username)
    return apiResponse(400, { message: 'Username should not be empty' });

  if (!password)
    return apiResponse(400, { message: 'Password should not be empty' });

  const existingUser = await findUserByUsernameAndIdRepository(
    username,
    userId,
  );

  if (existingUser)
    return apiResponse(400, { message: 'This username is already in use' });

  const passwordHash = await hash(password, 8);

  const editUserResponse = await editUserRepository(userId, {
    username,
    password: passwordHash,
  });

  return apiResponse(200, {
    message: 'Successfully edited user',
    object: {
      id: editUserResponse.id,
      username: editUserResponse.username,
      email: editUserResponse.email,
    },
  });
}
