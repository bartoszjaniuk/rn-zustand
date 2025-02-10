import { AxiosInstance } from "axios";
import { useAuthStore } from "../../store/authStore";

export const refreshTokenInterceptor = async ({
  error,
  api,
}: {
  error: any;
  api: AxiosInstance;
}) => {
  const originalRequest = error.config;
  const { refreshToken, setTokens, logout } = useAuthStore.getState();

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const response = await api.post(
        `auth/refresh-token`,
        {},
        { headers: { Authorization: `Bearer ${refreshToken}` } }
      );

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data;

      setTokens(newAccessToken, newRefreshToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      logout();
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};
