import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import secureStorage from './utils/secureStorage';
import { createSelectors } from './utils/createSelectors';

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
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
};

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      error: null,
      logout: () => {
        console.log('logout');
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
      setLoading: (isLoading: boolean) => set({ isLoading }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    },
  ),
);

export const useAuthSelectors = createSelectors(useAuthStore);
