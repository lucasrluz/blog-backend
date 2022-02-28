import { Router } from 'express';
import { deletePostController } from '../../../controllers/post/deletePostController';
import { editPostController } from '../../../controllers/post/editPostController';
import { findPostByUsernameController } from '../../../controllers/post/findPostByUsernameController';
import { findPostController } from '../../../controllers/post/findPostController';
import { savePostController } from '../../../controllers/post/savePostController';
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
