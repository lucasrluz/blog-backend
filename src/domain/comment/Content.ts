import { error, success } from '../../shared/response';
import { validateContent } from './validate/validations/validateContent';

export class Content {
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string) {
    const successOrError = validateContent(value);

    if (successOrError.isError()) return error(successOrError.value);

    return success(new Content(value));
  }
}
