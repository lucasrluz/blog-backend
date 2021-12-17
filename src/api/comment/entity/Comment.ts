import { IsNotEmpty } from 'class-validator';

export class Comment {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  postId: string;

  constructor(content: string, userId: string, postId: string) {
    this.content = content;
    this.userId = userId;
    this.postId = postId;
  }
}
