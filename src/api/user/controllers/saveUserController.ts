import { Request, Response } from 'express';
import { saveUserService } from '../service/saveUserService';

export async function saveUserController(req: Request, res: Response) {
  const { username, email, password } = req.body;

  const user = {
    username,
    email,
    password,
  };

  const response = await saveUserService(user);

  return res.status(response.status).json(response.data);
}
