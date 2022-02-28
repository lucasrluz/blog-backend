import { Request, Response } from 'express';
import { findPostService } from '../../../services/post/findPostService';

export async function findPostController(req: Request, res: Response) {
  const { post_id: postId, post_title: title, username } = req.params;

  const response = await findPostService(postId, title, username);

  res.status(response.status).json(response.data);
}
