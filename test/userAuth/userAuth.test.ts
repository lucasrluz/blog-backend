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

  describe('/user/:user_id (PUT) (middleware)', () => {
    it('Should return message of token invalid', async () => {
      const userData = {
        username: users[0].username,
        password: users[0].password,
      };

      await request(app).post('/user').send(users[0]);

      const saveUserResponse2 = await request(app).post('/user').send(users[1]);

      const userId = saveUserResponse2.body.object.id;

      const username = users[0].username;
      const password = users[0].password;

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.object.token;

      const editUserResponse = await request(app)
        .put(`/user/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(userData);

      expect(editUserResponse.status).toEqual(400);
      expect(editUserResponse.body.message).toEqual('Token invalid');
    });
  });
});
