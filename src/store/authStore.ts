import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import secureStorage from "./utils/secureStorage";
import { createSelectors } from "./utils/createSelectors";
import { AxiosError } from "axios";
import { authService } from "../api/auth/auth.service";

type User = {
	id: string;
	email: string;
	name: string | null;
};

type AuthState = {
	accessToken: string | null;
	refreshToken: string | null;
	// user: User | null;
	isLoading: boolean;
	error: string | null;
};

type AuthActions = {
	login: (userCredentials: UserCredentials) => Promise<void>;
	logout: () => void;
	setLoading: (loading: boolean) => void;
	// userInfo: () => Promise<void>;
	setTokens: (accessToken: string, refreshToken: string) => void;
};

type AuthStore = AuthState & AuthActions;

type UserCredentials = {
	email: string;
	password: string;
};

export const useAuthStore = create<AuthStore>()(
	persist(
		(set, get) => ({
			user: null,
			accessToken: null,
			refreshToken: null,
			isLoading: false,
			error: null,
			login: async (userCredentials: UserCredentials) => {
				set({ isLoading: true, error: null });
				try {
					const res = await authService.login(userCredentials);
					set({
						accessToken: res.accessToken,
						refreshToken: res.refreshToken,
						isLoading: false,
					});
				} catch (error) {
					if (error instanceof AxiosError) {
						set({ error: error.response?.data.message, isLoading: false });
					} else {
						set({ error: "Something went very wrong", isLoading: false });
					}
				}
			},
			logout: () => {
				console.log("logout");
				set((state) => ({
					...state,
					accessToken: null,
					refreshToken: null,
					user: null,
					error: null,
				}));
			},
			setTokens: (accessToken: string, refreshToken: string) => {
				set({ accessToken, refreshToken });
			},
			// userInfo: async () => {
			// 	try {
			// 		const user = await userService.getUserInfo();
			// 		console.log("user", user);
			// 		set({ user });
			// 	} catch (error) {
			// 		if (error instanceof AxiosError) {
			// 			set({ error: error.response?.data.message, isLoading: false });
			// 		}
			// 	}
			// },
			setLoading: (isLoading: boolean) => set({ isLoading }),
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => secureStorage),
			partialize: (state) => ({
				accessToken: state.accessToken,
				refreshToken: state.refreshToken,
			}),
		},
	),
);

export const useAuthSelectors = createSelectors(useAuthStore);
