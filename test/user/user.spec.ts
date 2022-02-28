import request from 'supertest';
import { saveUserRepository } from '../../src/api/user/repositories/saveUserRepository';
import { app } from '../../src/infra/external/express/app';
import { prisma } from '../../src/prisma/prisma';
import { users } from './data/users';

describe('User route', () => {
  beforeAll(async () => {
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();
  });

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

    it('Should not save user', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[4]);

      expect(saveUserResponse.status).toEqual(400);
      expect(saveUserResponse.body.message).toEqual(
        'Username should not be empty',
      );

      await prisma.user.deleteMany();
    });

    it('Should not save user', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[5]);

      expect(saveUserResponse.status).toEqual(400);
      expect(saveUserResponse.body.message).toEqual('Email must be an email');

      await prisma.user.deleteMany();
    });

    it('Should not save user', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[6]);

      expect(saveUserResponse.status).toEqual(400);
      expect(saveUserResponse.body.message).toEqual(
        'Password should not be empty',
      );
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

  describe('/user/:user_id (PUT)', () => {
    it('Should return edited user', async () => {
      const userData = {
        username: users[1].username,
        password: users[1].password,
      };

      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.object.id;

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

      expect(editUserResponse.status).toEqual(200);
      expect(editUserResponse.body.message).toEqual('Successfully edited user');
      expect(editUserResponse.body.object).toEqual({
        id: userId,
        username: userData.username,
        email: users[0].email,
      });

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not edited user', async () => {
      const userData = {
        username: users[0].username,
        password: users[0].password,
      };

      await request(app).post('/user').send(users[0]);

      const saveUserResponse = await request(app).post('/user').send(users[1]);

      const userId = saveUserResponse.body.object.id;

      const username = users[1].username;
      const password = users[1].password;

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.object.token;

      const editUserResponse = await request(app)
        .put(`/user/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(userData);

      expect(editUserResponse.status).toEqual(400);
      expect(editUserResponse.body.message).toEqual(
        'This username is already in use',
      );

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not edited user', async () => {
      const userData = {
        username: users[7].username,
        password: users[7].password,
      };

      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.object.id;

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
      expect(editUserResponse.body.message).toEqual(
        'Username should not be empty',
      );

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not edited user', async () => {
      const userData = {
        username: users[1].username,
        password: users[7].password,
      };

      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.object.id;

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
      expect(editUserResponse.body.message).toEqual(
        'Password should not be empty',
      );

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });
  });

  describe('/user/:user_id (DELETE)', () => {
    it('Should deleted user', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.object.id;

      const username = users[0].username;
      const password = users[0].password;

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.object.token;

      await prisma.refreshToken.deleteMany();

      const deleteUserResponse = await request(app)
        .delete(`/user/${userId}`)
        .auth(token, { type: 'bearer' });

      expect(deleteUserResponse.status).toEqual(200);
      expect(deleteUserResponse.body.message).toEqual(
        'User deleted successfully',
      );
    });
  });
});
