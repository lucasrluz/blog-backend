import { Router } from 'express';
import { deletePostController } from '../../../controllers/post/deletePostController';
import { editPostController } from '../../../controllers/post/editPostController';
import { findPostByUsernameController } from '../../../controllers/post/findPostByUsernameController';
import { findPostController } from '../../../controllers/post/findPostController';
import { savePostController } from '../../../controllers/post/savePostController';
import { ensureAuthenticatedUserAdaptRoute } from './adapters/userAuth/ensureAuthenticatedUserAdaptRoute';

export const postRoute = Router();

postRoute.post(
  '/post/:user_id',
  ensureAuthenticatedUserAdaptRoute,
  savePostController,
);
postRoute.get('/post/:username/:post_title/:post_id', findPostController);
postRoute.get('/post/:username', findPostByUsernameController);
postRoute.put(
  '/post/:user_id/:post_id',
  ensureAuthenticatedUserAdaptRoute,
  editPostController,
);
postRoute.delete(
  '/post/:user_id/:post_id',
  ensureAuthenticatedUserAdaptRoute,
  deletePostController,
);
