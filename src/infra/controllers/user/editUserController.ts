import { Request, Response } from 'express';
import { editUserService } from '../../../api/user/service/editUserService';

export async function editUserController(req: Request, res: Response) {
  const userId = req.params.user_id;

  const { username, password } = req.body;

  const response = await editUserService(userId, { username, password });

  return res.status(response.status).json(response.data);
}
