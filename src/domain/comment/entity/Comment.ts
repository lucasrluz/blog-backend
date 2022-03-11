import { error, success } from '../../../shared/response';
import { IComment } from '../interface/IComment';
import { validateComment } from '../validate/validateComment';
import { Content } from './Content';
import { PostId } from './PostId';
import { UserId } from './UserId';

export class Comment {
  content: Content;
  userId: UserId;
  postId: PostId;

  private constructor(content: Content, userId: UserId, postId: PostId) {
    this.content = content;
    this.userId = userId;
    this.postId = postId;
  }

  public static create(comment: IComment) {
    const successOrError = validateComment(comment);

    if (successOrError.isError()) return error(successOrError.value);

    return success(
      new Comment(
        successOrError.value.content,
        successOrError.value.userId,
        successOrError.value.postId,
      ),
    );
  }
}
