import { Request, Response } from 'express';
import { generateRefreshTokenService } from '../../../services/userAuth/generateRefreshTokenService';

export async function generateRefreshTokenController(
  req: Request,
  res: Response,
) {
  const { refreshToken } = req.body;

  const response = await generateRefreshTokenService(refreshToken);

  res.status(response.status).json(response.data);
}
