import { Router } from 'express';
import { ensureAuthenticatedUser } from '../userAuth/middleware/ensureAuthenticatedUser';
import { editUserController } from './controllers/editUserController';
import { findUserController } from './controllers/findUserController';
import { saveUserController } from './controllers/saveUserController';

export const userRoute = Router();

userRoute.post('/user', saveUserController);
userRoute.get('/user/:username', findUserController);
userRoute.put('/user/:user_id', ensureAuthenticatedUser, editUserController);
