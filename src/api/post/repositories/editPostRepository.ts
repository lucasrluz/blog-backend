import { prisma } from '../../../prisma/prisma';

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
