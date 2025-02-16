export const routeWelcome = "/welcome";
export const routeLogin = "/login";
export const routeRegister = "/register";

export const goToWelcome = routeWelcome as unknown as Route;
export const goToLogin = routeLogin as unknown as Route;
export const goToRegister = routeRegister as unknown as Route;

export const authRoutes = {
  routeWelcome,
  routeLogin,
  routeRegister,
  goToWelcome,
  goToLogin,
  goToRegister,
} as const;
