import { executeUserTests } from './user/user.spec';
import { executeUserAuthTests } from './userAuth/userAuth.spec';

describe('All testes', () => {
  executeUserTests();
  executeUserAuthTests();
});
