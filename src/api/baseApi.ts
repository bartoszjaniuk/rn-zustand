import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_URL } from "./api.consts";
import {
	errorInterceptor,
	identityInterceptor,
	jwtInterceptor,
	refreshTokenInterceptor,
} from "./interceptors";
import { getAccessToken } from "./utils/getAccessToken";
import { refreshToken } from "./utils/refreshToken";
import { logout } from "./utils/logout";

export abstract class ApiService {
	protected httpClient: AxiosInstance;

	constructor() {
		this.httpClient = axios.create({
			baseURL: API_URL,
			withCredentials: true,
		});

		this.httpClient.interceptors.request.use(
			(config) => jwtInterceptor(config, getAccessToken),
			errorInterceptor,
		);

		this.httpClient.interceptors.response.use(identityInterceptor, (error) =>
			refreshTokenInterceptor({
				error,
				api: this.httpClient,
				refreshTokenLogic: refreshToken,
				logout: logout,
			}),
		);
	}

	protected responseHandler<T = unknown>({ data }: AxiosResponse<T>) {
		return data;
	}

	protected async get<T = unknown>(url: string, config?: AxiosRequestConfig) {
		return await this.httpClient.get<T>(url, config);
	}

	protected async post<T = unknown, B = unknown>(
		url: string,
		body: B,
		config?: AxiosRequestConfig,
	) {
		return await this.httpClient.post<T>(url, body, config);
	}

	protected async put<T = unknown, B = unknown>(
		url: string,
		body: B,
		config?: AxiosRequestConfig,
	) {
		return await this.httpClient.put<T>(url, body, config);
	}

	protected async patch<T = unknown, B = unknown>(
		url: string,
		body?: B,
		config?: AxiosRequestConfig,
	) {
		return await this.httpClient.patch<T>(url, body, config);
	}

	protected async delete<T = unknown>(
		url: string,
		config?: AxiosRequestConfig,
	) {
		return await this.httpClient.delete<T>(url, config);
	}
}
