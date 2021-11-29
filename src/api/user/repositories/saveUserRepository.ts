import { prisma } from '../../../prisma/prisma';
import { IUser } from '../interface/IUser';

export async function saveUserRepository(user: IUser) {
  const { username, email, password } = user;

  return await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });
}
