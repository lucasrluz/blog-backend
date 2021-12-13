import { Request, Response } from 'express';
import { deletePostService } from '../services/deletePostService';

export async function deletePostController(req: Request, res: Response) {
  const { post_id: postId } = req.params;

  const response = await deletePostService(postId);

  return res.status(response.status).json(response.data);
}
