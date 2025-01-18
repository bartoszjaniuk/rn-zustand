import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Button } from "react-native";
import { useAuth } from "../providers/auth";

const NativeStack = createNativeStackNavigator();

const HomeScreen = () => {
	const auth = useAuth();
	return (
		<View>
			<Text>HomeScreen</Text>
			<Button title="Wyloguj" onPress={auth.signOut} />
		</View>
	);
};

const DetailsScreen = () => {
	return (
		<View>
			<Text>DetailsScreen</Text>
		</View>
	);
};

const ProfileScreen = () => {
	return (
		<View>
			<Text>ProfileScreen</Text>
		</View>
	);
};

export const RootNavigator = () => {
	return (
		<NativeStack.Navigator screenOptions={{ headerShown: false }}>
			<NativeStack.Screen name="Home" component={HomeScreen} />
			<NativeStack.Screen name="Details" component={DetailsScreen} />
			<NativeStack.Screen name="Profile" component={ProfileScreen} />
		</NativeStack.Navigator>
	);
};
