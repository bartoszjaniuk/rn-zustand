import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/login/Login";
import { RegisterScreen } from "../screens/register/Register";
import { WelcomeScreen } from "../screens/welcome/Welcome";
import { authRoutes } from "./routes";

const NativeStack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      <NativeStack.Screen
        name={authRoutes.routeWelcome}
        component={WelcomeScreen}
      />
      <NativeStack.Screen
        name={authRoutes.routeLogin}
        component={LoginScreen}
      />
      <NativeStack.Screen
        name={authRoutes.routeRegister}
        component={RegisterScreen}
      />
    </NativeStack.Navigator>
  );
};
