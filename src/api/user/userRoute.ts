import { Router } from 'express';
import { findUserController } from './controllers/findUserController';
import { saveUserController } from './controllers/saveUserController';

export const userRoute = Router();

userRoute.post('/user', saveUserController);
userRoute.get('/user/:username', findUserController);
