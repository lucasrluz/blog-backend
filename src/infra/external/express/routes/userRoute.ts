import { Router } from 'express';
import { ensureAuthenticatedUser } from '../../../middleware/ensureAuthenticatedUser';
import { editUserAdaptRoute } from './adapters/user/editUserAdaptRoute';
import { saveUserAdaptRoute } from './adapters/user/saveUserAdaptRoute';
import { findUserAdaptRoute } from './adapters/user/findUserAdaptRoute';
import { deleteUserAdaptRoute } from './adapters/user/deleteUserAdaptRoute';

export const userRoute = Router();

userRoute.post('/user', saveUserAdaptRoute);
userRoute.get('/user/:username', findUserAdaptRoute);
userRoute.put('/user/:user_id', ensureAuthenticatedUser, editUserAdaptRoute);
userRoute.delete(
  '/user/:user_id',
  ensureAuthenticatedUser,
  deleteUserAdaptRoute,
);
