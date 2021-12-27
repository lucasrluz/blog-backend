import { IsNotEmpty } from 'class-validator';

export class Post {
  @IsNotEmpty({ message: 'Title should not be empty' })
  title: string;

  @IsNotEmpty({ message: 'Content should not be empty' })
  content: string;

  @IsNotEmpty({ message: 'UserId should not be empty' })
  userId: string;

  constructor(title: string, content: string, userId: string) {
    this.title = title;
    this.content = content;
    this.userId = userId;
  }
}
