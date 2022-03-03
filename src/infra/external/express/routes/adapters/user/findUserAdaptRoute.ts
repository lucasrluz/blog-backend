import { Request, Response } from 'express';
import { findUserController } from '../../../../../controllers/user/findUserController';

export async function findUserAdaptRoute(req: Request, res: Response) {
  const username = req.params.username;

  const response = await findUserController(username);

  return res.status(response.statusCode).json(response.value);
}
