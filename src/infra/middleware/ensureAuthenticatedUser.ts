import { verify } from 'jsonwebtoken';
import {
  badRequest,
  ok,
  unauthorized,
} from '../controllers/util/response/httpResponse';

export async function ensureAuthenticatedUser(
  userId: string,
  header: string | undefined,
) {
  if (!header) return unauthorized('Token is missing');

  const [, token] = header.split(' ');

  try {
    verify(token, process.env.SECRET_OR_PRIVATE_KEY as string, {
      subject: userId,
    });
    return ok('Token valid');
  } catch (err: any) {
    return badRequest('Token invalid');
  }
}
