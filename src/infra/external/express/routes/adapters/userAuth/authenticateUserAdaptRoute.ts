import { Request, Response } from 'express';
import { authenticateUserController } from '../../../../../controllers/userAuth/authenticateUserController';

export async function authenticateUserAdaptRoute(req: Request, res: Response) {
  const { username, password } = req.body;

  const response = await authenticateUserController(username, password);

  return res.status(response.statusCode).json(response.value);
}
