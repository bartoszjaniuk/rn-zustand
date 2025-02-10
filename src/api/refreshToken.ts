import { useAuthStore } from "../store/authStore";
import { authService } from "./auth/auth.service";

export const refreshToken = async () => {
  const { setTokens } = useAuthStore.getState();
  const { accessToken, refreshToken } = await authService.refreshToken();

  setTokens(accessToken, refreshToken);

  return accessToken;
};
