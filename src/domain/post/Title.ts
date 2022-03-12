import { error, success } from '../../shared/response';
import { validateTitle } from './validate/validations/validateTitle';

export class Title {
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string) {
    const successOrError = validateTitle(value);

    if (successOrError.isError()) return error(successOrError.value);

    return success(new Title(value));
  }
}
