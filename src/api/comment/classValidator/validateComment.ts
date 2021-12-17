import { validate } from 'class-validator';
import { Comment } from '../entity/Comment';
import { IComment } from '../interface/IComment';

export async function validateComment(comment: IComment) {
  const { content, userId, postId } = comment;

  const commentValidation = new Comment(content, userId, postId);

  const errors = await validate(commentValidation);

  if (errors.length > 0) {
    const errorObjects: any = errors.map((v) => v.constraints);
    const properties: string[] = [];

    for (const prop in errorObjects[0]) {
      properties.push(prop);
    }

    return errorObjects[0][properties[0]];
  }

  return false;
}
