import { Request, Response } from 'express';
import { findUserService } from '../service/findUserService';

export async function findUserController(req: Request, res: Response) {
  const username = req.params.username;

  const response = await findUserService(username);

  return res.status(response.status).json(response.data);
}
