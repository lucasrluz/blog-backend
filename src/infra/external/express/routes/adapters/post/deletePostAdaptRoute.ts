import { Request, Response } from 'express';
import { deletePostController } from '../../../../../controllers/post/deletePostController';

export async function deletePostAdaptRoute(req: Request, res: Response) {
  const { post_id: postId } = req.params;

  const response = await deletePostController(postId);

  return res.status(response.statusCode).json(response.value);
}
