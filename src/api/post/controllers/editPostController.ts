import { Request, Response } from 'express';
import { editPostService } from '../services/editPostService';

export async function editPostController(req: Request, res: Response) {
  const { post_id: postId, user_id: userId } = req.params;

  const { title, content } = req.body;

  const response = await editPostService(postId, userId, { title, content });

  return res.status(response.status).json(response.data);
}
