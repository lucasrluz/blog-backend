import request from 'supertest';
import { app } from '../../src/infra/external/express/app';
import { prisma } from '../../src/infra/external/prisma/prisma';
import { users } from '../user/data/users';
import { sleep } from './methods/sleep';

jest.setTimeout(30000);

describe('User auth route', () => {
  beforeAll(async () => {
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();
  });

  describe('/login (POST)', () => {
    it('Should return jwt token', async () => {
      await request(app).post('/user').send(users[0]);

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      expect(authenticateUserResponse.status).toEqual(200);

      await prisma.refreshToken.deleteMany();
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
      expect(authenticateUserResponse.body).toEqual(
        'Username or password incorrect',
      );

      await prisma.refreshToken.deleteMany();
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
      expect(authenticateUserResponse.body).toEqual(
        'Username or password incorrect',
      );

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not return jwt token', async () => {
      await request(app).post('/user').send(users[0]);

      const { username, password } = users[4];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      expect(authenticateUserResponse.status).toEqual(400);
      expect(authenticateUserResponse.body).toEqual(
        'Username should not be empty',
      );

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not return jwt token', async () => {
      await request(app).post('/user').send(users[0]);

      const { username, password } = users[6];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      expect(authenticateUserResponse.status).toEqual(400);
      expect(authenticateUserResponse.body).toEqual(
        'Password should not be empty',
      );

      await prisma.refreshToken.deleteMany();
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

      const userId = saveUserResponse2.body.id;

      const username = users[0].username;
      const password = users[0].password;

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.token;

      const editUserResponse = await request(app)
        .put(`/user/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(userData);

      expect(editUserResponse.status).toEqual(400);
      expect(editUserResponse.body).toEqual('Token invalid');

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should return message of token is missing', async () => {
      const userData = {
        username: users[0].username,
        password: users[0].password,
      };

      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.id;

      const editUserResponse = await request(app)
        .put(`/user/${userId}`)
        .send(userData);
      expect(editUserResponse.status).toEqual(401);
      expect(editUserResponse.body).toEqual('Token is missing');

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });
  });

  describe('/refresh-token (POST)', () => {
    it('Should return refresh token', async () => {
      await request(app).post('/user').send(users[0]);

      const username = users[0].username;
      const password = users[0].password;

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const oldRefreshToken = authenticateUserResponse.body.refreshToken.id;

      const refreshTokenResponse = await request(app)
        .post('/refresh-token')
        .send(oldRefreshToken);

      const newRefreshToken = refreshTokenResponse.body.refreshToken.id;

      expect(refreshTokenResponse.status).toEqual(200);
      expect(oldRefreshToken).toEqual(newRefreshToken);

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should return new refresh token', async () => {
      await request(app).post('/user').send(users[0]);

      const username = users[0].username;
      const password = users[0].password;

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const oldToken = authenticateUserResponse.body.token;

      const oldRefreshToken = authenticateUserResponse.body.refreshToken.id;

      await sleep(20000);

      const refreshTokenResponse = await request(app)
        .post('/refresh-token')
        .send(oldRefreshToken);

      const newRefreshToken = refreshTokenResponse.body.refreshToken.id;

      const newToken = refreshTokenResponse.body.token;

      expect(refreshTokenResponse.status).toEqual(200);
      expect(newToken).not.toEqual(oldToken);
      expect(oldRefreshToken).not.toEqual(newRefreshToken);

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not return refresh token', async () => {
      const refreshTokenResponse = await request(app)
        .post('/refresh-token')
        .send('refresh-token-invalid');

      expect(refreshTokenResponse.status).toEqual(400);
      expect(refreshTokenResponse.body).toEqual('Refresh token invalid');
    });
  });
});
