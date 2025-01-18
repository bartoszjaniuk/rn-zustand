import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Button } from "react-native";
import { useAuth } from "../providers/auth";

const NativeStack = createNativeStackNavigator();

const WelcomeScreen = () => {
	const auth = useAuth();
	return (
		<View>
			<Text>WelcomeScreen</Text>
			<Button title="Login" onPress={() => auth.signIn("xd")} />
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
