import { Request, Response } from 'express';
import { savePostController } from '../../../../../controllers/post/savePostController';

export async function savePostAdaptRoute(req: Request, res: Response) {
  const userId = req.params.user_id;

  const { title, content } = req.body;

  const response = await savePostController(userId, title, content);

  return res.status(response.statusCode).json(response.value);
}
