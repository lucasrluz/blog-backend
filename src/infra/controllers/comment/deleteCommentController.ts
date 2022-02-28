import { Request, Response } from 'express';
import { deleteCommentService } from '../../../api/comment/service/deleteCommentService';

export async function deleteCommentController(req: Request, res: Response) {
  const { user_id: userId, comment_id: commentId } = req.params;

  const response = await deleteCommentService(commentId, userId);

  return res.status(response.status).json(response.data);
}
