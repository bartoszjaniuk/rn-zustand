import { userQueryKeys } from './user.keys';

import { ApiService } from '../baseApi';

export class UserService extends ApiService {
  constructor() {
    super();
  }

  getUserInfo = async () => {
    return this.responseHandler(
      await this.httpClient.get<{
        id: string;
        email: string;
        name: string | null;
      }>(userQueryKeys.userInfo()),
    );
  };
}

export const userService = new UserService();
