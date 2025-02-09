import { ApiService } from "../baseApi";
import { authQueryKeys } from "./auth.keys";

export class AuthService extends ApiService {
	constructor() {
		super();
	}

	login = async (payload: { email: string; password: string }) => {
		return this.responseHandler(
			await this.httpClient.post<{ accessToken: string; refreshToken: string }>(
				authQueryKeys.login(),
				payload,
			),
		);
	};

	register = async (payload: string) => {
		return this.responseHandler(
			await this.httpClient.post<Promise<void>>(authQueryKeys.register(), {
				email: payload,
			}),
		);
	};

	logout = async () => {
		return this.responseHandler(
			await this.httpClient.post<Promise<void>>(authQueryKeys.logout(), {}),
		);
	};
	//TODO: There should be added refresh token into authorization as bearer
	refreshToken = async () => {
		return this.responseHandler(
			await this.httpClient.post<{ accessToken: string; refreshToken: string }>(
				authQueryKeys.refreshToken(),
				{},
			),
		);
	};
}

export const authService = new AuthService();
