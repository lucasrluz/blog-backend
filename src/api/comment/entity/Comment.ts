import { IsNotEmpty } from 'class-validator';

export class Comment {
  @IsNotEmpty({ message: 'Content should not be empty' })
  content: string;

  @IsNotEmpty({ message: 'UserId should not be empty' })
  userId: string;

  @IsNotEmpty({ message: 'PostId should not be empty' })
  postId: string;

  constructor(content: string, userId: string, postId: string) {
    this.content = content;
    this.userId = userId;
    this.postId = postId;
  }
}
