import { authQueryKeys } from "./auth.keys";
import { ApiService } from "../baseApi";
import { useAuthStore } from "../../store/authStore";

export class AuthService extends ApiService {
  constructor() {
    super();
  }

  login = async (payload: { email: string; password: string }) => {
    return this.responseHandler(
      await this.httpClient.post<{ accessToken: string; refreshToken: string }>(
        authQueryKeys.login(),
        payload
      )
    );
  };

  register = async (payload: string) => {
    return this.responseHandler(
      await this.httpClient.post<Promise<void>>(authQueryKeys.register(), {
        email: payload,
      })
    );
  };

  refreshToken = async () => {
    const { refreshToken } = useAuthStore.getState();
    return this.responseHandler(
      await this.httpClient.post<{ accessToken: string; refreshToken: string }>(
        authQueryKeys.refreshToken(),
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      )
    );
  };

  logout = async () => {
    return this.responseHandler(
      await this.httpClient.post<Promise<void>>(authQueryKeys.logout(), {})
    );
  };
}

export const authService = new AuthService();
