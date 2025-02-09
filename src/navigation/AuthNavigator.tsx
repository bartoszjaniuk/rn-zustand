import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Button } from "react-native";
import { useAuthStore } from "../store/authStore";

const NativeStack = createNativeStackNavigator();

const WelcomeScreen = () => {
	const auth = useAuthStore();
	const handleLogin = async () => {
		await auth.login({ email: "user@gg.pl", password: "password" });
	};

	return (
		<View>
			<Text>WelcomeScreen</Text>
			{auth.error ? <Text>{auth.error}</Text> : null}
			<Button title="Login" onPress={handleLogin} />
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
