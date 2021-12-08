import request from 'supertest';
import { app } from '../../src/app';
import { prisma } from '../../src/prisma/prisma';
import { users } from '../user/data/users';
import { posts } from './data/posts';

export function executePostTests() {
  describe('Post route', () => {
    describe('/post (POST)', () => {
      it('Should save new post', async () => {
        const saveUserResponse = await request(app)
          .post('/user')
          .send(users[0]);

        const userId = saveUserResponse.body.object.id;

        const { username, password } = users[0];

        const authenticateUserResponse = await request(app)
          .post('/login')
          .send({ username, password });

        const token = authenticateUserResponse.body.object.token;

        const postData = {
          title: posts[0].title,
          content: posts[0].content,
        };

        const savePostResponse = await request(app)
          .post(`/post/${userId}`)
          .auth(token, { type: 'bearer' })
          .send(postData);

        expect(savePostResponse.status).toEqual(201);
        expect(savePostResponse.body.object.title).toEqual(postData.title);

        await prisma.post.deleteMany();
        await prisma.refreshToken.deleteMany();
        await prisma.user.deleteMany();
      });

      it('Should not save post', async () => {
        const saveUserResponse = await request(app)
          .post('/user')
          .send(users[0]);

        const userId = saveUserResponse.body.object.id;

        const { username, password } = users[0];

        const authenticateUserResponse = await request(app)
          .post('/login')
          .send({ username, password });

        const token = authenticateUserResponse.body.object.token;

        const postData = {
          title: posts[2].title,
          content: posts[2].content,
        };

        const savePostResponse = await request(app)
          .post(`/post/${userId}`)
          .auth(token, { type: 'bearer' })
          .send(postData);

        expect(savePostResponse.status).toEqual(400);
        expect(savePostResponse.body.message).toEqual(
          'title should not be empty',
        );

        await prisma.refreshToken.deleteMany();
        await prisma.user.deleteMany();
      });

      it('Should not save post', async () => {
        const saveUserResponse = await request(app)
          .post('/user')
          .send(users[0]);

        const userId = saveUserResponse.body.object.id;

        const { username, password } = users[0];

        const authenticateUserResponse = await request(app)
          .post('/login')
          .send({ username, password });

        const token = authenticateUserResponse.body.object.token;

        const postData = {
          title: posts[3].title,
          content: posts[3].content,
        };

        const savePostResponse = await request(app)
          .post(`/post/${userId}`)
          .auth(token, { type: 'bearer' })
          .send(postData);

        expect(savePostResponse.status).toEqual(400);
        expect(savePostResponse.body.message).toEqual(
          'content should not be empty',
        );

        await prisma.refreshToken.deleteMany();
        await prisma.user.deleteMany();
      });

      it('Should not save post', async () => {
        const saveUserResponse = await request(app)
          .post('/user')
          .send(users[0]);

        const userId = saveUserResponse.body.object.id;

        const { username, password } = users[0];

        const authenticateUserResponse = await request(app)
          .post('/login')
          .send({ username, password });

        const token = authenticateUserResponse.body.object.token;

        const postData = {
          title: posts[4].title,
          content: posts[4].content,
        };

        const savePostResponse = await request(app)
          .post(`/post/${userId}`)
          .auth(token, { type: 'bearer' })
          .send(postData);

        expect(savePostResponse.status).toEqual(400);
        expect(savePostResponse.body.message).toEqual(
          'title should not be empty',
        );

        await prisma.refreshToken.deleteMany();
        await prisma.user.deleteMany();
      });
    });
  });
}
