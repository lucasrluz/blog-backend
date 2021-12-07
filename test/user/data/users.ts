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
  {
    username: '',
    email: 'c@gmail.com',
    password: 'c',
  },
  {
    username: 'd',
    email: '',
    password: 'd',
  },
  {
    username: 'e',
    email: 'e@gmail.com',
    password: '',
  },
  {
    username: '',
    email: '',
    password: '',
  },
];
