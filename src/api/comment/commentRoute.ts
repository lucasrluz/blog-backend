import { Router } from 'express';
import { ensureAuthenticatedUser } from '../userAuth/middleware/ensureAuthenticatedUser';
import { editCommentController } from './controllers/editCommentController';
import { findCommentByPostController } from './controllers/findCommentByPostController';
import { saveCommentController } from './controllers/saveCommentController';

export const commentRoute = Router();

commentRoute.post(
  '/comment/:user_id',
  ensureAuthenticatedUser,
  saveCommentController,
);
commentRoute.get(
  '/comment/:user_id/:post_id',
  ensureAuthenticatedUser,
  findCommentByPostController,
);
commentRoute.put(
  '/comment/:comment_id/:user_id/:post_id',
  ensureAuthenticatedUser,
  editCommentController,
);
