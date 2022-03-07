import { Router } from 'express';
import { ensureAuthenticatedUser } from '../../../middleware/ensureAuthenticatedUser';
import { deleteCommentAdaptRoute } from './adapters/comment/deleteCommentAdaptRoute';
import { editCommentAdaptRoute } from './adapters/comment/editCommentAdaptRoute';
import { findCommentByPostAdaptRoute } from './adapters/comment/findCommentByPostAdapRoute';
import { saveCommentAdaptRoute } from './adapters/comment/saveCommentAdaptRoute';

export const commentRoute = Router();

commentRoute.post(
  '/comment/:user_id',
  ensureAuthenticatedUser,
  saveCommentAdaptRoute,
);
commentRoute.get(
  '/comment/:user_id/:post_id',
  ensureAuthenticatedUser,
  findCommentByPostAdaptRoute,
);
commentRoute.put(
  '/comment/:comment_id/:user_id/:post_id',
  ensureAuthenticatedUser,
  editCommentAdaptRoute,
);
commentRoute.delete(
  '/comment/:comment_id/:user_id',
  ensureAuthenticatedUser,
  deleteCommentAdaptRoute,
);
