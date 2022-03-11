import { error, success } from '../../shared/response';
import { validateUsername } from './validate/validations/validateUsername';

export class Username {
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string) {
    const successOrError = validateUsername(value);

    if (successOrError.isError()) return error(successOrError.value);

    return success(new Username(value));
  }
}
