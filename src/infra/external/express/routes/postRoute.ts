import { Router } from 'express';
import { deletePostController } from '../../../../api/post/controllers/deletePostController';
import { editPostController } from '../../../../api/post/controllers/editPostController';
import { findPostByUsernameController } from '../../../../api/post/controllers/findPostByUsernameController';
import { findPostController } from '../../../../api/post/controllers/findPostController';
import { savePostController } from '../../../../api/post/controllers/savePostController';
import { ensureAuthenticatedUser } from '../../../../api/userAuth/middleware/ensureAuthenticatedUser';

export const postRoute = Router();

postRoute.post('/post/:user_id', ensureAuthenticatedUser, savePostController);
postRoute.get('/post/:username/:post_title/:post_id', findPostController);
postRoute.get('/post/:username', findPostByUsernameController);
postRoute.put(
  '/post/:user_id/:post_id',
  ensureAuthenticatedUser,
  editPostController,
);
postRoute.delete(
  '/post/:user_id/:post_id',
  ensureAuthenticatedUser,
  deletePostController,
);
