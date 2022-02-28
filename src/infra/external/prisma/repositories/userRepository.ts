import { IUser } from '../../../../api/user/interface/IUser';
import { prisma } from '../prisma';

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

export async function findUserByUsernameRepository(username: string) {
  return await prisma.user.findFirst({
    where: {
      username,
    },
  });
}

export async function findUserByUsernameAndIdRepository(
  username: string,
  userId: string,
) {
  return await prisma.user.findFirst({
    where: {
      id: {
        not: userId,
      },
      username,
    },
  });
}

export async function findUserByUserIdRepository(userId: string) {
  return await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
}

export async function findUserByEmailRepository(email: string) {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
}

export async function editUserRepository(
  userId: string,
  data: { username: string; password: string },
) {
  const { username, password } = data;

  return await prisma.user.update({
    where: { id: userId },
    data: { username, password },
  });
}

export async function deleteUserRepository(userId: string) {
  await prisma.user.delete({ where: { id: userId } });
}
