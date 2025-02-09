import * as SecureStore from "expo-secure-store";

import axios, { AxiosInstance } from "axios";
import { API_URL, ACCESS_TOKEN } from "./api.consts";

const httpClient: AxiosInstance = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

httpClient.interceptors.request.use(
	async (config) => {
		const token = await SecureStore.getItemAsync(ACCESS_TOKEN);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// export const setupAxiosInterceptors = (signOut: () => void) => {
// 	httpClient.interceptors.response.use(
// 		(response) => response,
// 		(error) => {
// 			if (error.response && error.response.status === 401) {
// 				signOut();
// 			}
// 			return Promise.reject(error);
// 		},
// 	);
// };

export default httpClient;
