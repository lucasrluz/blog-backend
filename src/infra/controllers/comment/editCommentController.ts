import { Request, Response } from 'express';
import { editCommentService } from '../../../services/comment/editCommentService';

export async function editCommentController(req: Request, res: Response) {
  const {
    comment_id: commentId,
    user_id: userId,
    post_id: postId,
  } = req.params;

  const { content } = req.body;

  const response = await editCommentService(commentId, userId, postId, content);

  return res.status(response.status).json(response.data);
}
