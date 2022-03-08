import { Request, Response } from 'express';
import { findPostController } from '../../../../../controllers/post/findPostController';

export async function findPostAdaptRoute(req: Request, res: Response) {
  const { post_id: postId, post_title: title, username } = req.params;

  const response = await findPostController(postId, title, username);

  return res.status(response.statusCode).json(response.value);
}
