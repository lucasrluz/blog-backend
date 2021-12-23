import { apiResponse } from '../../../apiResponse/apiResponse';
import { IUser } from '../interface/IUser';
import { findUserByEmailRepository } from '../repositories/findUserByEmailRepository';
import { findUserByUsernameRepository } from '../repositories/findUserByUsernameRepository';
import { hash } from 'bcrypt';
import { saveUserRepository } from '../repositories/saveUserRepository';
import { validateUser } from '../classValidator/validateUser';

export async function saveUserService(user: IUser) {
  const { username, email, password } = user;

  const userValidation = await validateUser(user);

  if (userValidation) return apiResponse(400, { message: userValidation });

  const existingUserByUsername = await findUserByUsernameRepository(username);

  if (existingUserByUsername)
    return apiResponse(400, {
      message: 'This username is already in use',
    });

  const existingUserByEmail = await findUserByEmailRepository(email);

  if (existingUserByEmail)
    return apiResponse(400, {
      message: 'This e-mail is already in use',
    });

  const passwordHash = await hash(password, 8);

  const saveUserResponse = await saveUserRepository({
    username,
    email,
    password: passwordHash,
  });

  return apiResponse(201, {
    message: 'Successfully registered user',
    object: {
      id: saveUserResponse.id,
      username: saveUserResponse.username,
      email: saveUserResponse.email,
    },
  });
}
