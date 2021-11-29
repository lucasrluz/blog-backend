import { IUser } from '../../../src/api/user/interface/IUser';

export const users: IUser[] = [
  {
    username: 'a',
    email: 'a@gmail.com',
    password: 'a',
  },
  {
    username: 'b',
    email: 'b@gmail.com',
    password: 'b',
  },
  {
    username: 'a',
    email: 'b@gmail.com',
    password: 'ab',
  },
  {
    username: 'b',
    email: 'a@gmail.com',
    password: 'ba',
  },
];
