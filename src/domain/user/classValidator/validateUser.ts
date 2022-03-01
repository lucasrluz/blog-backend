import { validate } from 'class-validator';
import { User } from '../entity/User';
import { IUser } from '../interface/IUser';

export async function validateUser(user: IUser) {
  const { username, email, password } = user;

  const userValidation = new User(username, email, password);

  const errors = await validate(userValidation);

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
