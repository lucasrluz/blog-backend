import { hash } from 'bcrypt';
import { apiResponse } from '../../../apiResponse/apiResponse';
import { editUserRepository } from '../repositories/editUserRepository';
import { findUserByUsernameAndIdRepository } from '../repositories/findUserByUsernameAndIdRepository';

export async function editUserService(
  userId: string,
  data: { username: string; password: string },
) {
  const { username, password } = data;

  if (!username)
    return apiResponse(400, { message: 'username should not be empty' });

  if (!password)
    return apiResponse(400, { message: 'password should not be empty' });

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
