import { error, success } from '../../shared/response';
import { validatePassword } from './validate/validations/validatePassword';

export class Password {
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string) {
    const successOrError = validatePassword(value);

    if (successOrError.isError()) return error(successOrError.value);

    return success(new Password(value));
  }
}
