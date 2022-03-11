import { error, success } from '../../shared/response';
import { validateUserId } from './validate/validations/validateUserId';

export class UserId {
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string) {
    const successOrError = validateUserId(value);

    if (successOrError.isError()) return error(successOrError.value);

    return success(new UserId(value));
  }
}
