import { useAuthStore } from "../../store/authStore";

export const getAccessToken = () => {
	return useAuthStore.getState().accessToken;
};
