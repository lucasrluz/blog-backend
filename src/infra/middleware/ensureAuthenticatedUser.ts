import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export async function ensureAuthenticatedUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userId = req.params.user_id;

  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ message: 'Token is missing' });

  const [, token] = header.split(' ');

  try {
    verify(token, process.env.SECRET_OR_PRIVATE_KEY as string, {
      subject: userId,
    });
    next();
  } catch (error: any) {
    return res.status(400).json({ message: 'Token invalid' });
  }
}
