import { Request, Response } from 'express';
import { editCommentController } from '../../../../../controllers/comment/editCommentController';

export async function editCommentAdaptRoute(req: Request, res: Response) {
  const {
    comment_id: commentId,
    user_id: userId,
    post_id: postId,
  } = req.params;

  const content = req.body.content;

  const response = await editCommentController(
    commentId,
    userId,
    postId,
    content,
  );

  return res.status(response.statusCode).json(response.value);
}
