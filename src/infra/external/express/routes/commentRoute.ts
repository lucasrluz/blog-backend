import { Router } from 'express';
import { deleteCommentAdaptRoute } from './adapters/comment/deleteCommentAdaptRoute';
import { editCommentAdaptRoute } from './adapters/comment/editCommentAdaptRoute';
import { findCommentByPostAdaptRoute } from './adapters/comment/findCommentByPostAdapRoute';
import { saveCommentAdaptRoute } from './adapters/comment/saveCommentAdaptRoute';
import { ensureAuthenticatedUserAdaptRoute } from './adapters/userAuth/ensureAuthenticatedUserAdaptRoute';

export const commentRoute = Router();

commentRoute.post(
  '/comment/:user_id',
  ensureAuthenticatedUserAdaptRoute,
  saveCommentAdaptRoute,
);
commentRoute.get(
  '/comment/:user_id/:post_id',
  ensureAuthenticatedUserAdaptRoute,
  findCommentByPostAdaptRoute,
);
commentRoute.put(
  '/comment/:comment_id/:user_id/:post_id',
  ensureAuthenticatedUserAdaptRoute,
  editCommentAdaptRoute,
);
commentRoute.delete(
  '/comment/:comment_id/:user_id',
  ensureAuthenticatedUserAdaptRoute,
  deleteCommentAdaptRoute,
);
