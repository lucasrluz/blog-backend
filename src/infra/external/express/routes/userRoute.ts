import { Router } from 'express';
import { editUserAdaptRoute } from './adapters/user/editUserAdaptRoute';
import { saveUserAdaptRoute } from './adapters/user/saveUserAdaptRoute';
import { findUserAdaptRoute } from './adapters/user/findUserAdaptRoute';
import { deleteUserAdaptRoute } from './adapters/user/deleteUserAdaptRoute';
import { ensureAuthenticatedUserAdaptRoute } from './adapters/userAuth/ensureAuthenticatedUserAdaptRoute';

export const userRoute = Router();

userRoute.post('/user', saveUserAdaptRoute);
userRoute.get('/user/:username', findUserAdaptRoute);
userRoute.put(
  '/user/:user_id',
  ensureAuthenticatedUserAdaptRoute,
  editUserAdaptRoute,
);
userRoute.delete(
  '/user/:user_id',
  ensureAuthenticatedUserAdaptRoute,
  deleteUserAdaptRoute,
);
