import { validate } from 'class-validator';
import { Post } from '../entity/Post';
import { IPost } from '../interface/IPost';

export async function validatePost(post: IPost) {
  const { title, content, userId } = post;

  const postValidation = new Post(title, content, userId);

  const errors = await validate(postValidation);

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
