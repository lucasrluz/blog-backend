import { error, success } from '../../../shared/response';
import { IPost } from '../interface/IPost';
import { validatePost } from '../validate/validatePost';

export class Post {
  title: string;
  content: string;
  userId: string;

  private constructor(title: string, content: string, userId: string) {
    this.title = title;
    this.content = content;
    this.userId = userId;
  }

  public static create(post: IPost) {
    const successOrError = validatePost(post);

    if (successOrError.isError()) return error(successOrError.value);

    return success(new Post(post.title, post.content, post.userId));
  }
}
