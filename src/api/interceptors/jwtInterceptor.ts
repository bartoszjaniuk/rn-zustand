import { InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../../store/authStore";

export const jwtInterceptor = async (
  config: InternalAxiosRequestConfig<any>
) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};
