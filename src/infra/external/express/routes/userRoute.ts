import { Router } from 'express';
import { ensureAuthenticatedUser } from '../../../../api/userAuth/middleware/ensureAuthenticatedUser';
import { deleteUserController } from '../../../controllers/user/deleteUserController';
import { editUserController } from '../../../controllers/user/editUserController';
import { findUserController } from '../../../controllers/user/findUserController';
import { saveUserController } from '../../../controllers/user/saveUserController';

export const userRoute = Router();

userRoute.post('/user', saveUserController);
userRoute.get('/user/:username', findUserController);
userRoute.put('/user/:user_id', ensureAuthenticatedUser, editUserController);
userRoute.delete(
  '/user/:user_id',
  ensureAuthenticatedUser,
  deleteUserController,
);
