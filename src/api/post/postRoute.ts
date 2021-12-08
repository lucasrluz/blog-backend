import { Router } from 'express';
import { ensureAuthenticatedUser } from '../userAuth/middleware/ensureAuthenticatedUser';
import { savePostController } from './controllers/savePostController';

export const postRoute = Router();

postRoute.post('/post/:user_id', ensureAuthenticatedUser, savePostController);
