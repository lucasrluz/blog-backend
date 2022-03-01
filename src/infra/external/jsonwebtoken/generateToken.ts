import { sign } from 'jsonwebtoken';

export function generateToken(userId: string) {
  return sign({}, process.env.SECRET_OR_PRIVATE_KEY as string, {
    subject: userId,
    expiresIn: '20s',
  });
}
