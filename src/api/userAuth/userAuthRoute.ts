import { Router } from 'express';
import { authenticateUserController } from './controllers/authenticateUserController';
import { generateRefreshTokenController } from './controllers/generateRefreshTokenController';

export const userAuthRoute = Router();

userAuthRoute.post('/login', authenticateUserController);
userAuthRoute.post('/refresh-token', generateRefreshTokenController);
