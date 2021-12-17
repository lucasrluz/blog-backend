import request from 'supertest';
import { app } from '../../src/app';
import { prisma } from '../../src/prisma/prisma';
import { posts } from '../post/data/posts';
import { users } from '../user/data/users';
import { comments } from './data/comments';

export function executeCommentTests() {
  describe('Comment route', () => {
    describe('/comment/:user_id (POST)', () => {
      it('Should save new comment', async () => {
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
        expect(saveCommentResponse.body.object).toEqual({
          id: saveCommentResponse.body.object.id,
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
        expect(saveCommentResponse.body.message).toEqual(
          'content should not be empty',
        );

        await prisma.post.deleteMany();
        await prisma.refreshToken.deleteMany();
        await prisma.user.deleteMany();
      });

      it('Should not save comment', async () => {
        const saveUserResponse = await request(app)
          .post('/user')
          .send(users[0]);

        const userId = saveUserResponse.body.object.id;

        const { username, password } = users[0];

        const authenticateUserResponse = await request(app)
          .post('/login')
          .send({ username, password });

        const token = authenticateUserResponse.body.object.token;

        const commentData = {
          content: comments[0].content,
          postId: comments[0].postId,
        };

        const saveCommentResponse = await request(app)
          .post(`/comment/${userId}`)
          .auth(token, { type: 'bearer' })
          .send(commentData);

        expect(saveCommentResponse.status).toEqual(400);
        expect(saveCommentResponse.body.message).toEqual(
          'postId should not be empty',
        );

        await prisma.refreshToken.deleteMany();
        await prisma.user.deleteMany();
      });

      it('Should not save comment', async () => {
        const saveUserResponse = await request(app)
          .post('/user')
          .send(users[0]);

        const userId = saveUserResponse.body.object.id;

        const { username, password } = users[0];

        const authenticateUserResponse = await request(app)
          .post('/login')
          .send({ username, password });

        const token = authenticateUserResponse.body.object.token;

        const commentData = {
          content: comments[0].content,
          postId: 'postIdInvalid',
        };

        const saveCommentResponse = await request(app)
          .post(`/comment/${userId}`)
          .auth(token, { type: 'bearer' })
          .send(commentData);

        expect(saveCommentResponse.status).toEqual(404);
        expect(saveCommentResponse.body.message).toEqual('Post not found');

        await prisma.comment.deleteMany();
        await prisma.post.deleteMany();
        await prisma.refreshToken.deleteMany();
        await prisma.user.deleteMany();
      });
    });
  });
}
