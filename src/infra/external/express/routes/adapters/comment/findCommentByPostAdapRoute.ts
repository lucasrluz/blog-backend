import { Request, Response } from 'express';
import { findCommentByPostController } from '../../../../../controllers/comment/findCommentByPostController';

export async function findCommentByPostAdaptRoute(req: Request, res: Response) {
  const postId = req.params.post_id;

  const response = await findCommentByPostController(postId);

  return res.status(response.statusCode).json(response.value);
}
