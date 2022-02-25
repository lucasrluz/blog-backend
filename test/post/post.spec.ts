import request from 'supertest';
import { app } from '../../src/app';
import { prisma } from '../../src/prisma/prisma';
import { users } from '../user/data/users';
import { posts } from './data/posts';

describe('Post route', () => {
  beforeAll(async () => {
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();
  });

  describe('/post (POST)', () => {
    it('Should save new post', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

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
      const saveUserResponse = await request(app).post('/user').send(users[0]);

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
        'Title should not be empty',
      );

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not save post', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

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
        'Content should not be empty',
      );

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not save post', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

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
        'Title should not be empty',
      );

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });
  });

  describe('/post/:username/:post_title/:post_id (GET)', () => {
    it('Should return post', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

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

      const postId = savePostResponse.body.object.id;

      const findPostResponse = await request(app).get(
        `/post/${username}/${postData.title}/${postId}`,
      );

      expect(findPostResponse.status).toEqual(200);
      expect(findPostResponse.body.object).toEqual({
        id: postId,
        title: postData.title,
        content: postData.content,
        userId,
      });

      await prisma.post.deleteMany();
      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not return post', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

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

      const postId = savePostResponse.body.object.id;

      const findPostResponse = await request(app).get(
        `/post/${users[1].username}/${postData.title}/${postId}`,
      );

      expect(findPostResponse.status).toEqual(404);
      expect(findPostResponse.body.message).toEqual('User not found');

      await prisma.post.deleteMany();
      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not return post', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

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

      const postId = savePostResponse.body.object.id;

      const findPostResponse = await request(app).get(
        `/post/${username}/${posts[1].title}/${postId}`,
      );

      expect(findPostResponse.status).toEqual(404);
      expect(findPostResponse.body.message).toEqual('Post not found');

      await prisma.post.deleteMany();
      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });
  });

  describe('/post/:username (GET)', () => {
    it('Should return posts by username', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.object.id;

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.object.token;

      const postData1 = {
        title: posts[0].title,
        content: posts[0].content,
      };

      const postData2 = {
        title: posts[1].title,
        content: posts[1].content,
      };

      await request(app)
        .post(`/post/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(postData1);

      await request(app)
        .post(`/post/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(postData2);

      const findPostResponse = await request(app).get(`/post/${username}`);

      expect(findPostResponse.status).toEqual(200);
      expect(findPostResponse.body.object.length).toEqual(2);

      await prisma.post.deleteMany();
      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not return posts', async () => {
      const findPostResponse = await request(app).get(
        `/post/${users[0].username}`,
      );

      expect(findPostResponse.status).toEqual(404);
      expect(findPostResponse.body.message).toEqual('User not found');
    });

    it('Should not return posts', async () => {
      await request(app).post('/user').send(users[0]);

      const findPostResponse = await request(app).get(
        `/post/${users[0].username}`,
      );

      expect(findPostResponse.status).toEqual(404);
      expect(findPostResponse.body.message).toEqual('Posts not found');

      await prisma.user.deleteMany();
    });
  });

  describe('/post/:user_id/:post_id (PUT)', () => {
    it('Should return post edited', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.object.id;

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.object.token;

      const postData1 = {
        title: posts[0].title,
        content: posts[0].content,
      };

      const savePostResponse = await request(app)
        .post(`/post/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(postData1);

      const postId = savePostResponse.body.object.id;

      const postData2 = {
        title: posts[1].title,
        content: posts[1].content,
      };

      const editPostResponse = await request(app)
        .put(`/post/${userId}/${postId}`)
        .auth(token, { type: 'bearer' })
        .send(postData2);

      expect(editPostResponse.status).toEqual(200);
      expect(editPostResponse.body.object).toEqual({
        id: postId,
        title: postData2.title,
        content: postData2.content,
        userId,
      });

      await prisma.post.deleteMany();
      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not edited post', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.object.id;

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.object.token;

      const postData1 = {
        title: posts[0].title,
        content: posts[0].content,
      };

      const savePostResponse = await request(app)
        .post(`/post/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(postData1);

      const postId = savePostResponse.body.object.id;

      const postData2 = {
        title: posts[2].title,
        content: posts[2].content,
      };

      const editPostResponse = await request(app)
        .put(`/post/${userId}/${postId}`)
        .auth(token, { type: 'bearer' })
        .send(postData2);

      expect(editPostResponse.status).toEqual(400);
      expect(editPostResponse.body.message).toEqual(
        'Title should not be empty',
      );

      await prisma.post.deleteMany();
      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not edited post', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.object.id;

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.object.token;

      const postData1 = {
        title: posts[0].title,
        content: posts[0].content,
      };

      const savePostResponse = await request(app)
        .post(`/post/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(postData1);

      const postId = savePostResponse.body.object.id;

      const postData2 = {
        title: posts[3].title,
        content: posts[3].content,
      };

      const editPostResponse = await request(app)
        .put(`/post/${userId}/${postId}`)
        .auth(token, { type: 'bearer' })
        .send(postData2);

      expect(editPostResponse.status).toEqual(400);
      expect(editPostResponse.body.message).toEqual(
        'Content should not be empty',
      );

      await prisma.post.deleteMany();
      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not edited post', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.object.id;

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.object.token;

      const postData2 = {
        title: posts[0].title,
        content: posts[0].content,
      };

      const editPostResponse = await request(app)
        .put(`/post/${userId}/${'postIdInvalid'}`)
        .auth(token, { type: 'bearer' })
        .send(postData2);

      expect(editPostResponse.status).toEqual(404);
      expect(editPostResponse.body.message).toEqual('Post not found');

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });
  });

  describe('/post/:user_id/:post_id (DELETE)', () => {
    it('Should deleted post', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

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

      const postId = savePostResponse.body.object.id;

      const deletePostResponse = await request(app)
        .delete(`/post/${userId}/${postId}`)
        .auth(token, { type: 'bearer' });

      expect(deletePostResponse.status).toEqual(200);
      expect(deletePostResponse.body.message).toEqual(
        'Post deleted successfully',
      );

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should deleted post', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.object.id;

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.object.token;

      const deletePostResponse = await request(app)
        .delete(`/post/${userId}/${'postIdInvalid'}`)
        .auth(token, { type: 'bearer' });

      expect(deletePostResponse.status).toEqual(404);
      expect(deletePostResponse.body.message).toEqual('Post not found');

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });
  });
});
