import { Request, Response } from 'express';
import { deleteUserService } from '../service/deleteUserService';

export async function deleteUserController(req: Request, res: Response) {
  const userId = req.params.user_id;

  const response = await deleteUserService(userId);

  return res.status(response.status).json(response.data);
}
