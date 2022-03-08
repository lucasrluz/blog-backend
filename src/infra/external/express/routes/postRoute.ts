import { Router } from 'express';
import { deletePostController } from '../../../controllers/post/deletePostController';
import { editPostController } from '../../../controllers/post/editPostController';
import { findPostByUsernameController } from '../../../controllers/post/findPostByUsernameController';
import { deletePostAdaptRoute } from './adapters/post/deletePostAdaptRoute';
import { editPostAdaptRoute } from './adapters/post/editPostAdaptRoute';
import { findPostAdaptRoute } from './adapters/post/findPostAdaptRoute';
import { findPostByUsernameAdaptRoute } from './adapters/post/findPostByUsernameAdaptRoute';
import { savePostAdaptRoute } from './adapters/post/savePostAdaptRoute';
import { ensureAuthenticatedUserAdaptRoute } from './adapters/userAuth/ensureAuthenticatedUserAdaptRoute';

export const postRoute = Router();

postRoute.post(
  '/post/:user_id',
  ensureAuthenticatedUserAdaptRoute,
  savePostAdaptRoute,
);
postRoute.get('/post/:username/:post_title/:post_id', findPostAdaptRoute);
postRoute.get('/post/:username', findPostByUsernameAdaptRoute);
postRoute.put(
  '/post/:user_id/:post_id',
  ensureAuthenticatedUserAdaptRoute,
  editPostAdaptRoute,
);
postRoute.delete(
  '/post/:user_id/:post_id',
  ensureAuthenticatedUserAdaptRoute,
  deletePostAdaptRoute,
);
