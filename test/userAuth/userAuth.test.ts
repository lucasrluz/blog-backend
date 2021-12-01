import request from 'supertest';
import { app } from '../../src/app';
import { prisma } from '../../src/prisma/prisma';
import { users } from '../user/data/users';
import { validateToken } from './validateToken/validateToken';

describe('User auth route', () => {
  describe('/login (POST)', () => {
    it('Should return jwt token', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      expect(authenticateUserResponse.status).toEqual(200);

      const tokenValidation = validateToken(
        authenticateUserResponse.body.object.token,
        saveUserResponse.body.object.id,
      );

      expect(tokenValidation).toEqual('Token valid');

      await prisma.user.deleteMany();
    });

    it('Should not return jwt token', async () => {
      await request(app).post('/user').send(users[0]);

      const username = users[1].username;
      const password = users[0].password;

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      expect(authenticateUserResponse.status).toEqual(400);
      expect(authenticateUserResponse.body.message).toEqual(
        'Username or password incorrect',
      );

      await prisma.user.deleteMany();
    });

    it('Should not return jwt token', async () => {
      await request(app).post('/user').send(users[0]);

      const username = users[0].username;
      const password = users[1].password;

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      expect(authenticateUserResponse.status).toEqual(400);
      expect(authenticateUserResponse.body.message).toEqual(
        'Username or password incorrect',
      );

      await prisma.user.deleteMany();
    });
  });
});
