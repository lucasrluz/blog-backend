import { verify } from 'jsonwebtoken';

export function validateToken(token: string, userId: string) {
  try {
    verify(token, 'eb66b0ef-f356-4f83-bb3c-78124abc7288', { subject: userId });
    return 'Token valid';
  } catch (error: any) {
    return 'Token invalid';
  }
}
