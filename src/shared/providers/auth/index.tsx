import * as React from 'react';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import * as SecureStore from 'expo-secure-store';

type AuthContextType = {
  signIn: (data: any) => Promise<void>;
  signOut: () => void;
  signUp: (data: any) => Promise<void>;
  session?: string | null;
  isLoading: boolean;
};

const initialState: AuthContextType = {
  signIn: async () => {},
  signOut: () => {},
  signUp: async () => {},
  session: null,
  isLoading: true,
};

const AuthContext = createContext<AuthContextType>(initialState);

type AuthAction =
  | { type: 'RESTORE_TOKEN'; session: string | null }
  | { type: 'SIGN_IN'; session: string }
  | { type: 'SIGN_OUT' }
  | { type: 'RESET_PASSWORD' }
  | { type: 'UPDATE_PROFILE'; data: any };

const authReducer = (
  prevState: AuthContextType,
  action: AuthAction,
): AuthContextType => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        session: action.session,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        session: action.session,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        session: null,
      };
    case 'RESET_PASSWORD':
      // Handle reset password logic
      return {
        ...prevState,
      };
    case 'UPDATE_PROFILE':
      return {
        ...prevState,
      };
    default:
      return prevState;
  }
};

// AuthProvider component
export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await SecureStore.getItemAsync('userToken');
        console.log(userToken, 'userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', session: userToken ?? null });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      ...state,
      signIn: async (data: any) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        await SecureStore.setItemAsync('userToken', 'dummy-auth-token');
        dispatch({ type: 'SIGN_IN', session: 'dummy-auth-token' });
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync('userToken');

        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data: any) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', session: 'dummy-auth-token' });
      },
      resetPassword: async (email: string) => {
        // Implement reset password logic
        dispatch({ type: 'RESET_PASSWORD' });
      },
      updateProfile: async (data: any) => {
        // Implement update profile logic
        dispatch({ type: 'UPDATE_PROFILE', data });
      },
    }),
    [state],
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
