import { Router } from 'express';
import { ensureAuthenticatedUser } from '../userAuth/middleware/ensureAuthenticatedUser';
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
