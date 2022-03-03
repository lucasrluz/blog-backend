import { Request, Response } from 'express';
import { saveUserController } from '../../../../../controllers/user/saveUserController';

export async function saveUserAdaptRoute(req: Request, res: Response) {
  const user = req.body;

  const response = await saveUserController(user);

  return res.status(response.statusCode).json(response.value);
}
