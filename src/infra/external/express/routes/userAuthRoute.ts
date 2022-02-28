import { Router } from 'express';
import { authenticateUserController } from '../../../controllers/userAuth/authenticateUserController';
import { generateRefreshTokenController } from '../../../controllers/userAuth/generateRefreshTokenController';

export const userAuthRoute = Router();

userAuthRoute.post('/login', authenticateUserController);
userAuthRoute.post('/refresh-token', generateRefreshTokenController);
