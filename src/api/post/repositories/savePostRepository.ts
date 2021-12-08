import { prisma } from '../../../prisma/prisma';
import { IPost } from '../interface/IPost';

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
