import { Request, Response } from 'express';
import { findPostByUsernameController } from '../../../../../controllers/post/findPostByUsernameController';

export async function findPostByUsernameAdaptRoute(
  req: Request,
  res: Response,
) {
  const { username } = req.params;

  const response = await findPostByUsernameController(username);

  return res.status(response.statusCode).json(response.value);
}
