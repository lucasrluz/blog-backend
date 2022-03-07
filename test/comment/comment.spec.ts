import request from 'supertest';
import { app } from '../../src/infra/external/express/app';
import { prisma } from '../../src/infra/external/prisma/prisma';
import { posts } from '../post/data/posts';
import { users } from '../user/data/users';
import { comments } from './data/comments';

describe('Comment route', () => {
  beforeAll(async () => {
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();
  });

  describe('/comment/:user_id (POST)', () => {
    it('Should save new comment', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.id;

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.token;

      const postData = {
        title: posts[0].title,
        content: posts[0].content,
      };

      const savePostResponse = await request(app)
        .post(`/post/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(postData);

      const postId = savePostResponse.body.object.id;

      const commentData = {
        content: comments[0].content,
        postId,
      };

      const saveCommentResponse = await request(app)
        .post(`/comment/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(commentData);

      expect(saveCommentResponse.status).toEqual(201);
      expect(saveCommentResponse.body).toEqual({
        id: saveCommentResponse.body.id,
        content: commentData.content,
        userId,
        postId,
      });

      await prisma.comment.deleteMany();
      await prisma.post.deleteMany();
      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not save comment', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.id;

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.token;

      const postData = {
        title: posts[0].title,
        content: posts[0].content,
      };

      const savePostResponse = await request(app)
        .post(`/post/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(postData);

      const postId = savePostResponse.body.object.id;

      const commentData = {
        content: comments[2].content,
        postId,
      };

      const saveCommentResponse = await request(app)
        .post(`/comment/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(commentData);

      expect(saveCommentResponse.status).toEqual(400);
      expect(saveCommentResponse.body).toEqual('Content should not be empty');

      await prisma.post.deleteMany();
      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not save comment', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.id;

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.token;

      const commentData = {
        content: comments[0].content,
        postId: comments[0].postId,
      };

      const saveCommentResponse = await request(app)
        .post(`/comment/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(commentData);

      expect(saveCommentResponse.status).toEqual(400);
      expect(saveCommentResponse.body).toEqual('PostId should not be empty');

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not save comment', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.id;

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.token;

      const commentData = {
        content: comments[0].content,
        postId: 'postIdInvalid',
      };

      const saveCommentResponse = await request(app)
        .post(`/comment/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(commentData);

      expect(saveCommentResponse.status).toEqual(404);
      expect(saveCommentResponse.body).toEqual('Post not found');

      await prisma.comment.deleteMany();
      await prisma.post.deleteMany();
      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });
  });

  describe('/comment/:user_id/:post_id (GET)', () => {
    it('Should return comments by post', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.id;

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.token;

      const postData = {
        title: posts[0].title,
        content: posts[0].content,
      };

      const savePostResponse = await request(app)
        .post(`/post/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(postData);

      const postId = savePostResponse.body.object.id;

      const commentData1 = {
        content: comments[0].content,
        postId,
      };

      const commentData2 = {
        content: comments[0].content,
        postId,
      };

      await request(app)
        .post(`/comment/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(commentData1);

      await request(app)
        .post(`/comment/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(commentData2);

      const findCommentResponse = await request(app)
        .get(`/comment/${userId}/${postId}`)
        .auth(token, { type: 'bearer' });

      expect(findCommentResponse.status).toEqual(200);
      expect(findCommentResponse.body.length).toEqual(2);

      await prisma.comment.deleteMany();
      await prisma.post.deleteMany();
      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not return comments', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.id;

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.token;

      const postData = {
        title: posts[0].title,
        content: posts[0].content,
      };

      const savePostResponse = await request(app)
        .post(`/post/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(postData);

      const postId = savePostResponse.body.object.id;

      const commentData1 = {
        content: comments[0].content,
        postId,
      };

      const commentData2 = {
        content: comments[0].content,
        postId,
      };

      await request(app)
        .post(`/comment/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(commentData1);

      await request(app)
        .post(`/comment/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(commentData2);

      const findCommentResponse = await request(app)
        .get(`/comment/${userId}/${'postIdInvalid'}`)
        .auth(token, { type: 'bearer' });

      expect(findCommentResponse.status).toEqual(404);
      expect(findCommentResponse.body).toEqual('Post not found');

      await prisma.comment.deleteMany();
      await prisma.post.deleteMany();
      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not return comments', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.id;

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.token;

      const postData = {
        title: posts[0].title,
        content: posts[0].content,
      };

      const savePostResponse = await request(app)
        .post(`/post/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(postData);

      const postId = savePostResponse.body.object.id;

      const findCommentResponse = await request(app)
        .get(`/comment/${userId}/${postId}`)
        .auth(token, { type: 'bearer' });

      expect(findCommentResponse.status).toEqual(404);
      expect(findCommentResponse.body).toEqual('Comments not found');

      await prisma.post.deleteMany();
      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });
  });

  describe('/comment/:comment_id/:user_id/:post_id (PUT)', () => {
    it('Should return edited comment', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.id;

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.token;

      const postData = {
        title: posts[0].title,
        content: posts[0].content,
      };

      const savePostResponse = await request(app)
        .post(`/post/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(postData);

      const postId = savePostResponse.body.object.id;

      const commentData = {
        content: comments[0].content,
        postId,
      };

      const saveCommentResponse = await request(app)
        .post(`/comment/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(commentData);

      const commentId = saveCommentResponse.body.id;

      const content = comments[1].content;

      const editCommentResponse = await request(app)
        .put(`/comment/${commentId}/${userId}/${postId}`)
        .auth(token, { type: 'bearer' })
        .send({ content });

      expect(editCommentResponse.status).toEqual(200);
      expect(editCommentResponse.body).toEqual({
        id: saveCommentResponse.body.id,
        content: comments[1].content,
        userId,
        postId,
      });

      await prisma.comment.deleteMany();
      await prisma.post.deleteMany();
      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not edited comment', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.id;

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.token;

      const postData = {
        title: posts[0].title,
        content: posts[0].content,
      };

      const savePostResponse = await request(app)
        .post(`/post/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(postData);

      const postId = savePostResponse.body.object.id;

      const commentData = {
        content: comments[0].content,
        postId,
      };

      await request(app)
        .post(`/comment/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(commentData);

      const content = comments[1].content;

      const editCommentResponse = await request(app)
        .put(`/comment/${'commentIdInvalid'}/${userId}/${postId}`)
        .auth(token, { type: 'bearer' })
        .send({ content });

      expect(editCommentResponse.status).toEqual(404);
      expect(editCommentResponse.body).toEqual('Comment not found');

      await prisma.comment.deleteMany();
      await prisma.post.deleteMany();
      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not edited comment', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.id;

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.token;

      const postData = {
        title: posts[0].title,
        content: posts[0].content,
      };

      const savePostResponse = await request(app)
        .post(`/post/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(postData);

      const postId = savePostResponse.body.object.id;

      const commentData = {
        content: comments[0].content,
        postId,
      };

      const saveCommentResponse = await request(app)
        .post(`/comment/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(commentData);

      const commentId = saveCommentResponse.body.id;

      const content = comments[1].content;

      const editCommentResponse = await request(app)
        .put(`/comment/${commentId}/${userId}/${'postIdInvalid'}`)
        .auth(token, { type: 'bearer' })
        .send({ content });

      expect(editCommentResponse.status).toEqual(404);
      expect(editCommentResponse.body).toEqual('Comment not found');

      await prisma.comment.deleteMany();
      await prisma.post.deleteMany();
      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not edited comment', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.id;

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.token;

      const postData = {
        title: posts[0].title,
        content: posts[0].content,
      };

      const savePostResponse = await request(app)
        .post(`/post/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(postData);

      const postId = savePostResponse.body.object.id;

      const commentData = {
        content: comments[0].content,
        postId,
      };

      const saveCommentResponse = await request(app)
        .post(`/comment/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(commentData);

      const commentId = saveCommentResponse.body.id;

      const content = comments[2].content;

      const editCommentResponse = await request(app)
        .put(`/comment/${commentId}/${userId}/${postId}`)
        .auth(token, { type: 'bearer' })
        .send({ content });

      expect(editCommentResponse.status).toEqual(400);
      expect(editCommentResponse.body).toEqual('Content should not be empty');

      await prisma.comment.deleteMany();
      await prisma.post.deleteMany();
      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });
  });

  describe('/comment/:comment_id/:user_id (DELETE)', () => {
    it('Should deleted comment', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.id;

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.token;

      const postData = {
        title: posts[0].title,
        content: posts[0].content,
      };

      const savePostResponse = await request(app)
        .post(`/post/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(postData);

      const postId = savePostResponse.body.object.id;

      const commentData = {
        content: comments[0].content,
        postId,
      };

      const saveCommentResponse = await request(app)
        .post(`/comment/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(commentData);

      const commentId = saveCommentResponse.body.id;

      const deleteCommentResponse = await request(app)
        .delete(`/comment/${commentId}/${userId}`)
        .auth(token, { type: 'bearer' });

      expect(deleteCommentResponse.status).toEqual(200);
      expect(deleteCommentResponse.body).toEqual(
        'Successfully deleted comment',
      );

      await prisma.post.deleteMany();
      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should not deleted comment', async () => {
      const saveUserResponse = await request(app).post('/user').send(users[0]);

      const userId = saveUserResponse.body.id;

      const { username, password } = users[0];

      const authenticateUserResponse = await request(app)
        .post('/login')
        .send({ username, password });

      const token = authenticateUserResponse.body.token;

      const deleteCommentResponse = await request(app)
        .delete(`/comment/${'commentIdInvalid'}/${userId}`)
        .auth(token, { type: 'bearer' });

      expect(deleteCommentResponse.status).toEqual(404);
      expect(deleteCommentResponse.body).toEqual('Comment not found');

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });
  });
});
