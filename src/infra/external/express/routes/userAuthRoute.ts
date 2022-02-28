import { Router } from 'express';
import { authenticateUserController } from '../../../../api/userAuth/controllers/authenticateUserController';
import { generateRefreshTokenController } from '../../../../api/userAuth/controllers/generateRefreshTokenController';

export const userAuthRoute = Router();

userAuthRoute.post('/login', authenticateUserController);
userAuthRoute.post('/refresh-token', generateRefreshTokenController);
