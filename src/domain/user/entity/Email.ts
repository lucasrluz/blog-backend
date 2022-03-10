import { error, success } from '../../../shared/response';
import { validateEmail } from '../validate/validations/validateEmail';

export class Email {
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string) {
    const successOrError = validateEmail(value);

    if (successOrError.isError()) return error(successOrError.value);

    return success(new Email(value));
  }
}
