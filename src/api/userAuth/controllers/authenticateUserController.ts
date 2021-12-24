import { Request, Response } from 'express';
import { authenticateUserService } from '../service/authenticateUserService';

export async function authenticateUserController(req: Request, res: Response) {
  const { username, password } = req.body;

  const response = await authenticateUserService(username, password);

  return res.status(response.status).json(response.data);
}
