import axios, { AxiosInstance, AxiosResponse } from "axios";
import { authQueryKeys } from "./auth.keys";
import { API_URL } from "../api.consts";

export class AuthService {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: API_URL,
      withCredentials: true,
    });
  }

  private responseHandler = <T = unknown>({ data }: AxiosResponse<T>) => {
    return data;
  };

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

  logout = async () => {
    return this.responseHandler(
      await this.httpClient.post<Promise<void>>(authQueryKeys.logout(), {})
    );
  };
}

export const authService = new AuthService();
