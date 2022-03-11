import { error, success } from '../../shared/response';
import { validatePostId } from './validate/validations/validatePostId';

export class PostId {
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string) {
    const successOrError = validatePostId(value);

    if (successOrError.isError()) return error(successOrError.value);

    return success(new PostId(value));
  }
}
