import { Router } from 'express';
import { authenticateUserController } from './controller/authenticateUserController';
import { generateRefreshTokenController } from './controller/generateRefreshTokenController';

export const userAuthRoute = Router();

userAuthRoute.post('/login', authenticateUserController);
userAuthRoute.post('/refresh-token', generateRefreshTokenController);
