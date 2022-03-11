import { hash } from 'bcrypt';
import { IUser } from '../../domain/user/interface/IUser';
import {
  findUserByEmailRepository,
  findUserByUsernameRepository,
  saveUserRepository,
} from '../../infra/external/prisma/repositories/userRepository';
import { error, success } from '../../shared/response';
import { User } from '../../domain/user/User';

export async function saveUserService(user: IUser) {
  const { username, email, password } = user;

  const userOrError = User.create(user);

  if (userOrError.isError()) return error(userOrError.value);

  const existingUserByUsername = await findUserByUsernameRepository(username);

  if (existingUserByUsername) return error('This username is already in use');

  const existingUserByEmail = await findUserByEmailRepository(email);

  if (existingUserByEmail) return error('This e-mail is already in use');

  const passwordHash = await hash(password, 8);

  const saveUserResponse = await saveUserRepository({
    username,
    email,
    password: passwordHash,
  });

  return success({
    id: saveUserResponse.id,
    username: saveUserResponse.username,
    email: saveUserResponse.email,
  });
}
