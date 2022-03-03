import { Request, Response } from 'express';
import { editUserController } from '../../../../../controllers/user/editUserController';

export async function editUserAdaptRoute(req: Request, res: Response) {
  const userId = req.params.user_id;
  const { username, password } = req.body;

  const response = await editUserController(userId, username, password);

  return res.status(response.statusCode).json(response.value);
}
