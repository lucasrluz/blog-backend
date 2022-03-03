import { Request, Response } from 'express';
import { findCommentByPostService } from '../../../services/comment/findCommentByPostService';

export async function findCommentByPostController(req: Request, res: Response) {
  const { post_id: postId } = req.params;

  const response = await findCommentByPostService(postId);

  return res.status(response.status).json(response.data);
}