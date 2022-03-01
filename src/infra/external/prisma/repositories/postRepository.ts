import { IPost } from '../../../../domain/post/interface/IPost';
import { prisma } from '../prisma';

export async function savePostRepository(post: IPost) {
  const { title, content, userId } = post;

  return await prisma.post.create({
    data: {
      title,
      content,
      userId,
    },
  });
}

export async function findPostByUsernameRepository(username: string) {
  return await prisma.post.findMany({
    where: {
      user: {
        username,
      },
    },
  });
}

export async function findPostByTitleUsernamePostIdRepository(
  postId: string,
  title: string,
  userId: string,
) {
  return await prisma.post.findFirst({
    where: {
      id: postId,
      title: title,
      userId: userId,
    },
  });
}

export async function findPostByPostIdRepository(postId: string) {
  return await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });
}

export async function findPostByPostIdAndUserIdRepository(
  postId: string,
  userId: string,
) {
  return await prisma.post.findFirst({
    where: {
      id: postId,
      userId,
    },
  });
}

export async function editPostRepository(
  postId: string,
  title: string,
  content: string,
) {
  return await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title,
      content,
    },
  });
}

export async function deletePostRepository(postId: string) {
  return await prisma.post.delete({
    where: {
      id: postId,
    },
  });
}
