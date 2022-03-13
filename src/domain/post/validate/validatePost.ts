import { error, success } from '../../../shared/response';
import { Content } from '../../shared/Content';
import { UserId } from '../../shared/UserId';
import { IPost } from '../interface/IPost';
import { Title } from '../Title';

export function validatePost(post: IPost) {
  const titleOrError = Title.create(post.title);
  const contentOrError = Content.create(post.content);
  const userIdOrError = UserId.create(post.userId);

  if (titleOrError.isError()) return error(titleOrError.value);
  if (contentOrError.isError()) return error(contentOrError.value);
  if (userIdOrError.isError()) return error(userIdOrError.value);

  return success({
    title: titleOrError.value,
    content: contentOrError.value,
    userId: userIdOrError.value,
  });
}
