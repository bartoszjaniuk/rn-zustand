import { AxiosInstance } from "axios";

export const refreshTokenInterceptor = async ({
	error,
	api,
	refreshTokenLogic,
	logout,
}: {
	error: any;
	api: AxiosInstance;
	refreshTokenLogic: () => Promise<unknown>;
	logout: () => void;
}) => {
	const originalRequest = error.config;

	if (error.response?.status === 401 && !originalRequest._retry) {
		originalRequest._retry = true;
		try {
			const accessToken = await refreshTokenLogic();
			originalRequest.headers.Authorization = `Bearer ${accessToken}`;
		} catch (refreshError) {
			console.log("RefreshError", refreshError);
			logout();
			return Promise.reject(refreshError);
		}
		return api(originalRequest);
	}

	return Promise.reject(error);
};
