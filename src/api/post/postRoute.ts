import { Router } from 'express';
import { ensureAuthenticatedUser } from '../userAuth/middleware/ensureAuthenticatedUser';
import { editPostController } from './controllers/editPostController';
import { findPostByUsernameController } from './controllers/findPostByUsernameController';
import { findPostController } from './controllers/findPostController';
import { savePostController } from './controllers/savePostController';

export const postRoute = Router();

postRoute.post('/post/:user_id', ensureAuthenticatedUser, savePostController);
postRoute.get('/post/:username/:post_title/:post_id', findPostController);
postRoute.get('/post/:username', findPostByUsernameController);
postRoute.put(
  '/post/:user_id/:post_id',
  ensureAuthenticatedUser,
  editPostController,
);
