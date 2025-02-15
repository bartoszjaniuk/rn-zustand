import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Button } from "react-native";
import { useAuthStore } from "../store/authStore";
import { useLoginMutation } from "../api/auth/hooks/useLoginMutation";
import { LoginWithGoogle } from "../components/LoginWithGoogle/LoginWithGoogle";

const NativeStack = createNativeStackNavigator();

const WelcomeScreen = () => {
  const auth = useAuthStore();

  const onLoginSuccess = (data: {
    accessToken: string;
    refreshToken: string;
  }) => {
    auth.setTokens(data.accessToken, data.refreshToken);
  };

  const loginMutation = useLoginMutation(onLoginSuccess);

  const handleLogin = () => {
    loginMutation.mutate({ email: "user@gg.pl", password: "password" });
  };

  return (
    <View>
      <Text>WelcomeScreen</Text>
      {loginMutation.error ? (
        <Text>{loginMutation.error.response?.data.message}</Text>
      ) : null}
      <Button title="Login" onPress={handleLogin} />
      <LoginWithGoogle />
    </View>
  );
};

const LoginScreen = () => {
  return (
    <View>
      <Text>LoginScreen</Text>
    </View>
  );
};

const RegisterScreen = () => {
  return (
    <View>
      <Text>RegisterScreen</Text>
    </View>
  );
};

export const AuthNavigator = () => {
  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      <NativeStack.Screen name="Welcome" component={WelcomeScreen} />
      <NativeStack.Screen name="Login" component={LoginScreen} />
      <NativeStack.Screen name="Register" component={RegisterScreen} />
    </NativeStack.Navigator>
  );
};
