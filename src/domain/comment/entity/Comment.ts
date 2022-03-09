import { error, success } from '../../../shared/response';
import { IComment } from '../interface/IComment';
import { validateComment } from '../validate/validateComment';

export class Comment {
  content: string;
  userId: string;
  postId: string;

  private constructor(content: string, userId: string, postId: string) {
    this.content = content;
    this.userId = userId;
    this.postId = postId;
  }

  public static create(comment: IComment) {
    const successOrError = validateComment(comment);

    if (successOrError.isError()) return error(successOrError.value);

    return success(
      new Comment(comment.content, comment.userId, comment.postId),
    );
  }
}
