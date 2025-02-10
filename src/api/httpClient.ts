import axios, { AxiosInstance } from "axios";
import { API_URL } from "./api.consts";
import { useAuthStore } from "../store/authStore";
import { authService } from "./auth/auth.service";

export const httpClient: AxiosInstance = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

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
	},
);

httpClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		const { refreshToken, setTokens, logout } = useAuthStore.getState();

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const response = await axios.post(
					`${API_URL}auth/refresh-token`,
					{},
					{ headers: { Authorization: `Bearer ${refreshToken}` } },
				);

				const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
					response.data;

				setTokens(newAccessToken, newRefreshToken);

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return httpClient(originalRequest);
			} catch (refreshError) {
				logout();
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	},
);

export default httpClient;
