import { IComment } from '../../../../domain/comment/interface/IComment';
import { prisma } from '../prisma';

export async function saveCommentRepository(comment: IComment) {
  const { content, userId, postId } = comment;

  return await prisma.comment.create({
    data: {
      content,
      userId,
      postId,
    },
  });
}

export async function findCommentByUserIdPostIdCommentIdRepository(
  userId: string,
  postId: string,
  commentId: string,
) {
  return await prisma.comment.findFirst({
    where: {
      id: commentId,
      userId,
      postId,
    },
  });
}

export async function findCommentByPostRepository(postId: string) {
  return await prisma.comment.findMany({
    where: {
      postId,
    },
  });
}

export async function findCommentByCommentIdUserIdRepository(
  commentId: string,
  userId: string,
) {
  return await prisma.comment.findFirst({
    where: {
      id: commentId,
      userId,
    },
  });
}

export async function editCommentRepository(
  commentId: string,
  content: string,
) {
  return await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content,
    },
  });
}

export async function deleteCommentRepository(commentId: string) {
  return await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
}
