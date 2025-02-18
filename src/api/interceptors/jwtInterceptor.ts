import { InternalAxiosRequestConfig } from 'axios';

export const jwtInterceptor = async (
  config: InternalAxiosRequestConfig<any>,
  getAccessToken: () => string | null,
) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};
