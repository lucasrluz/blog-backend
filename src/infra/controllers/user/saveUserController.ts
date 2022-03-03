import { IUser } from '../../../domain/user/interface/IUser';
import { saveUserService } from '../../../services/user/saveUserService';
import { badRequest, created } from '../util/response/httpResponse';

export async function saveUserController(user: IUser) {
  const response = await saveUserService(user);

  if (response.isError()) return badRequest(response.value);

  return created(response.value);
}
