import { Router } from 'express';
import { deleteCommentController } from '../../../controllers/comment/deleteCommentController';
import { editCommentController } from '../../../controllers/comment/editCommentController';
import { findCommentByPostController } from '../../../controllers/comment/findCommentByPostController';
import { saveCommentController } from '../../../controllers/comment/saveCommentController';
import { ensureAuthenticatedUser } from '../../../middleware/ensureAuthenticatedUser';

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
commentRoute.delete(
  '/comment/:comment_id/:user_id',
  ensureAuthenticatedUser,
  deleteCommentController,
);
