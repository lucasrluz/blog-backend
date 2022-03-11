import { error, success } from '../../../shared/response';
import { Content } from '../Content';
import { PostId } from '../PostId';
import { UserId } from '../UserId';
import { IComment } from '../interface/IComment';

export function validateComment(comment: IComment) {
  const contentOrError = Content.create(comment.content);
  const userIdOrError = UserId.create(comment.userId);
  const postIdOrError = PostId.create(comment.postId);

  if (contentOrError.isError()) return error(contentOrError.value);

  if (userIdOrError.isError()) return error(userIdOrError.value);

  if (postIdOrError.isError()) return error(postIdOrError.value);

  return success({
    content: contentOrError.value,
    userId: userIdOrError.value,
    postId: postIdOrError.value,
  });
}
