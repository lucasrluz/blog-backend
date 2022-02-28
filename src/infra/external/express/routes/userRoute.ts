import { Router } from 'express';
import { ensureAuthenticatedUser } from '../../../../api/userAuth/middleware/ensureAuthenticatedUser';
import { deleteUserController } from '../../../../api/user/controllers/deleteUserController';
import { editUserController } from '../../../../api/user/controllers/editUserController';
import { findUserController } from '../../../../api/user/controllers/findUserController';
import { saveUserController } from '../../../../api/user/controllers/saveUserController';

export const userRoute = Router();

userRoute.post('/user', saveUserController);
userRoute.get('/user/:username', findUserController);
userRoute.put('/user/:user_id', ensureAuthenticatedUser, editUserController);
userRoute.delete(
  '/user/:user_id',
  ensureAuthenticatedUser,
  deleteUserController,
);
