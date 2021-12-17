import { executeCommentTests } from './comment/comment.spec';
import { executePostTests } from './post/post.spec';
import { executeUserTests } from './user/user.spec';
import { executeUserAuthTests } from './userAuth/userAuth.spec';

jest.setTimeout(120000);

describe('All testes', () => {
  executeUserTests();
  executeUserAuthTests();
  executePostTests();
  executeCommentTests();
});
