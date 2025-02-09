import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { authService } from "../api/auth/auth.service";
import secureStorage from "./utils/secureStorage";
import { createSelectors } from "./utils/createSelectors";
import { AxiosError } from "axios";

type User = {
	id: string;
	email: string;
	name: string;
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
	refreshAccessToken: () => Promise<void>;
	setLoading: (loading: boolean) => void;
};

type AuthStore = AuthState & AuthActions;

type UserCredentials = {
	email: string;
	password: string;
};

export const useAuthStore = create<AuthStore>()(
	persist(
		(set, get) => ({
			accessToken: null,
			refreshToken: null,
			isLoading: false,
			error: null,
			login: async (userCredentials: UserCredentials) => {
				set({ isLoading: true, error: null });
				try {
					const res = await authService.login(userCredentials);

					console.log(res, "res");
					set({
						accessToken: res.accessToken,
						refreshToken: res.refreshToken,
						isLoading: false,
					});
				} catch (error) {
					if (error instanceof AxiosError) {
						set({ error: error.response?.data.message, isLoading: false });
					}

					set({ error: "Something went very wrong", isLoading: false });
				}
			},
			logout: () => {
				set({ accessToken: null, refreshToken: null });
			},
			refreshAccessToken: async () => {
				const { refreshToken } = get();
				if (!refreshToken) return;

				set({ isLoading: true });
				try {
					const response = await authService.refreshToken();
					set({
						accessToken: response.accessToken,
						refreshToken: response.refreshToken,
						isLoading: false,
					});
				} catch (error) {
					set({ error: "Failed to refresh token", isLoading: false });
				}
			},
			setLoading: (isLoading: boolean) => set({ isLoading }),
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => secureStorage),
			// Enables to pick some of the state's fields to be stored in the storage.
			partialize: (state) => ({
				accessToken: state.accessToken,
				refreshToken: state.refreshToken,
			}),
		},
	),
);

export const useAuthSelectors = createSelectors(useAuthStore);
