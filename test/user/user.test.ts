import request from 'supertest';
import { saveUserRepository } from '../../src/api/user/repositories/saveUserRepository';
import { app } from '../../src/app';
import { prisma } from '../../src/prisma/prisma';
import { users } from './data/users';

describe('User route', () => {
  describe('/user (POST)', () => {
    it('Should save new user', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      expect(saveUserResponse.status).toEqual(201);
      expect(saveUserResponse.body.message).toEqual(
        'Successfully registered user',
      );

      const { username, email } = saveUserResponse.body.object;

      expect(username).toEqual(users[0].username);
      expect(email).toEqual(users[0].email);

      await prisma.user.deleteMany();
    });

    it('Should not save user', async () => {
      await saveUserRepository(users[0]);

      const saveUserResponse = await request(app).post('/user').send(users[2]);

      expect(saveUserResponse.status).toEqual(400);
      expect(saveUserResponse.body.message).toEqual(
        'This username is already in use',
      );

      await prisma.user.deleteMany();
    });

    it('Should not save user', async () => {
      await saveUserRepository(users[0]);

      const saveUserResponse = await request(app).post('/user').send(users[3]);

      expect(saveUserResponse.status).toEqual(400);
      expect(saveUserResponse.body.message).toEqual(
        'This e-mail is already in use',
      );

      await prisma.user.deleteMany();
    });
  });
});
