import { error, success } from '../../shared/response';
import { Content } from '../shared/Content';
import { UserId } from '../shared/UserId';
import { IPost } from './interface/IPost';
import { Title } from './Title';
import { validatePost } from './validate/validatePost';

export class Post {
  title: Title;
  content: Content;
  userId: UserId;

  private constructor(title: Title, content: Content, userId: UserId) {
    this.title = title;
    this.content = content;
    this.userId = userId;
  }

  public static create(post: IPost) {
    const successOrError = validatePost(post);

    if (successOrError.isError()) return error(successOrError.value);

    return success(
      new Post(
        successOrError.value.title,
        successOrError.value.content,
        successOrError.value.userId,
      ),
    );
  }
}
