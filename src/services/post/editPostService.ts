import { Post } from '../../domain/post/Post';
import {
  editPostRepository,
  findPostByPostIdAndUserIdRepository,
} from '../../infra/external/prisma/repositories/postRepository';
import { error, success } from '../../shared/response';

export async function editPostService(
  postId: string,
  userId: string,
  data: {
    title: string;
    content: string;
  },
) {
  const { title, content } = data;

  const post = {
    title,
    content,
    userId,
  };

  const postOrError = Post.create(post);

  if (postOrError.isError()) return error(postOrError.value);

  const existingPost = await findPostByPostIdAndUserIdRepository(
    postId,
    userId,
  );

  if (!existingPost) return error('Post not found');

  const editResponse = await editPostRepository(postId, title, content);

  return success(editResponse);
}
