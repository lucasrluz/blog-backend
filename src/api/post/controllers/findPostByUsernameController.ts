import { Request, Response } from 'express';
import { findPostByUsernameService } from '../services/findPostByUsernameService';

export async function findPostByUsernameController(
  req: Request,
  res: Response,
) {
  const { username } = req.params;

  const response = await findPostByUsernameService(username);

  return res.status(response.status).json(response.data);
}
