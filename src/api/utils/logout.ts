import { useAuthStore } from "../../store/authStore";

export const logout = () => {
	return useAuthStore.getState().logout();
};
