import { Request, Response } from 'express';
import { generateRefreshTokenController } from '../../../../../controllers/userAuth/generateRefreshTokenController';

export async function generateRefreshTokenAdaptRoute(
  req: Request,
  res: Response,
) {
  const refreshTokenId = req.body;

  const response = await generateRefreshTokenController(refreshTokenId);

  return res.status(response.statusCode).json(response.value);
}
