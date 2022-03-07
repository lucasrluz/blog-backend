import { Request, Response } from 'express';
import { saveCommentController } from '../../../../../controllers/comment/saveCommentController';

export async function saveCommentAdaptRoute(req: Request, res: Response) {
  const userId = req.params.user_id;
  const { content, postId } = req.body;

  const response = await saveCommentController(userId, content, postId);

  return res.status(response.statusCode).json(response.value);
}
