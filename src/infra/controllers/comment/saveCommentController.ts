import { Request, Response } from 'express';
import { saveCommentService } from '../../../services/comment/saveCommentService';

export async function saveCommentController(req: Request, res: Response) {
  const { user_id: userId } = req.params;
  const { content, postId } = req.body;

  const response = await saveCommentService({ content, userId, postId });

  return res.status(response.status).json(response.data);
}
