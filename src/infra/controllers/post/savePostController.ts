import { Request, Response } from 'express';
import { savePostService } from '../../../services/post/savePostService';

export async function savePostController(req: Request, res: Response) {
  const userId = req.params.user_id;

  const { title, content } = req.body;

  const post = {
    title,
    content,
    userId,
  };

  const response = await savePostService(post);

  return res.status(response.status).json(response.data);
}
