import { sign } from 'jsonwebtoken';

export function generateToken(userId: string) {
  return sign({}, 'eb66b0ef-f356-4f83-bb3c-78124abc7288', {
    subject: userId,
    expiresIn: '20s',
  });
}
