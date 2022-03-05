import { Router } from 'express';
import { authenticateUserAdaptRoute } from './adapters/userAuth/authenticateUserAdaptRoute';
import { generateRefreshTokenAdaptRoute } from './adapters/userAuth/generateRefreshTokenAdaptRoute';

export const userAuthRoute = Router();

userAuthRoute.post('/login', authenticateUserAdaptRoute);
userAuthRoute.post('/refresh-token', generateRefreshTokenAdaptRoute);
