import { Request, Response } from 'express';
import { deleteUserController } from '../../../../../controllers/user/deleteUserController';

export async function deleteUserAdaptRoute(req: Request, res: Response) {
  const userId = req.params.user_id;

  const response = await deleteUserController(userId);

  return res.status(response.statusCode).json(response.value);
}
