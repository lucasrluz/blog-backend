import { Router } from 'express';
import { saveUserController } from './controllers/saveUserController';

export const userRoute = Router();

userRoute.post('/user', saveUserController);
