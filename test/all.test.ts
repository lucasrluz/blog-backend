import { executeUserTests } from './user/user.spec';
import { executeUserAuthTests } from './userAuth/userAuth.spec';

jest.setTimeout(50000);

describe('All testes', () => {
  executeUserTests();
  executeUserAuthTests();
});
