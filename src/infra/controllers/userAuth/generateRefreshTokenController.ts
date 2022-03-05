import { generateRefreshTokenService } from '../../../services/userAuth/generateRefreshTokenService';
import { badRequest, ok } from '../util/response/httpResponse';

export async function generateRefreshTokenController(refreshTokenId: string) {
  const response = await generateRefreshTokenService(refreshTokenId);

  if (response.isError()) return badRequest(response.value);

  return ok(response.value);
}
