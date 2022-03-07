import { Request, Response } from 'express';
import { deleteCommentController } from '../../../../../controllers/comment/deleteCommentController';

export async function deleteCommentAdaptRoute(req: Request, res: Response) {
  const { user_id: userId, comment_id: commentId } = req.params;

  const response = await deleteCommentController(userId, commentId);

  return res.status(response.statusCode).json(response.value);
}
