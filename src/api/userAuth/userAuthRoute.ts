import { Router } from 'express';
import { authenticateUserController } from './controller/authenticateUserController';

export const userAuthRoute = Router();

userAuthRoute.post('/login', authenticateUserController);
