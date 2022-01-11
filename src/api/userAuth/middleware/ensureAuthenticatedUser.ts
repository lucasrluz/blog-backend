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
    verify(token, 'eb66b0ef-f356-4f83-bb3c-78124abc7288', {
      subject: userId,
    });
    next();
  } catch (error: any) {
    return res.status(400).json({ message: 'Token invalid' });
  }
}
