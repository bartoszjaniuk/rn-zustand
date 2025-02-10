import { useAuthStore } from "../store/authStore";

export const onLogout = () => {
  const { logout } = useAuthStore();

  return logout();
};
