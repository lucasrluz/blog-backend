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

  describe('/user/:username (GET)', () => {
    it('Should return user', async () => {
      await request(app).post('/user').send(users[0]);

      const findUserResponse = await request(app).get(
        `/user/${users[0].username}`,
      );

      expect(findUserResponse.status).toEqual(200);
      expect(findUserResponse.body.object).toEqual({
        username: users[0].username,
      });

      await prisma.user.deleteMany();
    });

    it('Should not return user', async () => {
      const findUserResponse = await request(app).get(
        `/user/${users[0].username}`,
      );

      expect(findUserResponse.status).toEqual(404);
      expect(findUserResponse.body.message).toEqual('User not found');
    });
  });
});
