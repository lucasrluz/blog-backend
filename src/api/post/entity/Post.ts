import { IsNotEmpty } from 'class-validator';

export class Post {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  userId: string;

  constructor(title: string, content: string, userId: string) {
    this.title = title;
    this.content = content;
    this.userId = userId;
  }
}
