import { Request, Response } from 'express';
import { editPostController } from '../../../../../controllers/post/editPostController';

export async function editPostAdaptRoute(req: Request, res: Response) {
  const { post_id: postId, user_id: userId } = req.params;

  const { title, content } = req.body;

  const response = await editPostController(postId, userId, title, content);

  return res.status(response.statusCode).json(response.value);
}
