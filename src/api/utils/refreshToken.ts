import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { API_URL } from "../api.consts";

export const refreshToken = async () => {
	const store = useAuthStore.getState();

	const response = await axios.post(
		`${API_URL}auth/refresh-token`,
		{},
		{ headers: { Authorization: `Bearer ${store.refreshToken}` } },
	);

	const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
		response.data;

	store.setTokens(newAccessToken, newRefreshToken);

	return newAccessToken;
};
