import { ProtectedApiService } from "../protectedApiService";
import { userQueryKeys } from "./user.keys";

export class UserService extends ProtectedApiService {
  constructor() {
    super();
  }

  refreshToken = async () => {
    return this.responseHandler(
      await this.httpClient.post<{ accessToken: string; refreshToken: string }>(
        userQueryKeys.refreshToken(),
        {}
      )
    );
  };

  getUserInfo = async () => {
    return this.responseHandler(
      await this.httpClient.get<{
        id: string;
        email: string;
        name: string | null;
      }>(userQueryKeys.userInfo())
    );
  };
}

export const userService = new UserService();
