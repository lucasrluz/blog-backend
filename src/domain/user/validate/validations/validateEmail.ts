import { error, success } from '../../../../shared/response';

export function validateEmail(email: string) {
  const maxLocalSize = 64;
  const maxDomainSize = 255;

  const [local, domain] = email.split('@');

  if (
    !local ||
    local.length > maxLocalSize ||
    !domain ||
    domain.length > maxDomainSize
  )
    return error('Email must be an email');

  return success(email);
}
