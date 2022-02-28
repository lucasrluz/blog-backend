import { Router } from 'express';
import { deleteCommentController } from '../../../../api/comment/controllers/deleteCommentController';
import { editCommentController } from '../../../../api/comment/controllers/editCommentController';
import { findCommentByPostController } from '../../../../api/comment/controllers/findCommentByPostController';
import { saveCommentController } from '../../../../api/comment/controllers/saveCommentController';
import { ensureAuthenticatedUser } from '../../../../api/userAuth/middleware/ensureAuthenticatedUser';

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
