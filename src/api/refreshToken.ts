import { useAuthStore } from "../store/authStore";
import { authService } from "./auth/auth.service";

export const refreshToken = async () => {
	const store = useAuthStore.getState();

	const { accessToken, refreshToken } = await authService.refreshToken(
		store.refreshToken as string,
	);

	store.setTokens(accessToken, refreshToken);

	return accessToken;
};
