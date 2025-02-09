import axios, { AxiosInstance } from "axios";
import { API_URL } from "./api.consts";
import { useAuthStore } from "../store/authStore";
import { userService } from "./user/user.service";

export const httpClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedRequests = [];

httpClient.interceptors.request.use(
  async (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          failedRequests.push(() => resolve(httpClient(originalRequest)));
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const tokens = await userService.refreshToken();
        if (tokens) {
          console.log(tokens, "tokens");
          useAuthStore
            .getState()
            .setTokens(tokens.accessToken, tokens.refreshToken);
        }
        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
        failedRequests.forEach((cb) => cb());
        failedRequests = [];
        return httpClient(originalRequest);
      } catch (refreshError) {
        await useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;
