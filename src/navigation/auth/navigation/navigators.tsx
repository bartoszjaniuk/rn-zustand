import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/login/Login';
import { RegisterScreen } from '../screens/register/Register';
import { WelcomeScreen } from '../screens/welcome/Welcome';

export type AuthParamList = {
  Welcome: undefined;
  Login: { user: string };
  Register: undefined;
};

const NativeStack = createNativeStackNavigator<AuthParamList>();

export const AuthNavigator = () => {
  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      <NativeStack.Screen name="Welcome" component={WelcomeScreen} />
      <NativeStack.Screen name="Login" component={LoginScreen} />
      <NativeStack.Screen name="Register" component={RegisterScreen} />
    </NativeStack.Navigator>
  );
};
