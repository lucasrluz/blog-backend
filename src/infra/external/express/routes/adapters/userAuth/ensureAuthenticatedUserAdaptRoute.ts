import { NextFunction, Request, Response } from 'express';
import { ensureAuthenticatedUser } from '../../../../../middleware/ensureAuthenticatedUser';

export async function ensureAuthenticatedUserAdaptRoute(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userId = req.params.user_id;
  const header = req.headers.authorization;

  const response = await ensureAuthenticatedUser(userId, header);

  if (response.statusCode !== 200) {
    return res.status(response.statusCode).json(response.value);
  }

  return next();
}
