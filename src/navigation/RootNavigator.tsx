import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Button } from "react-native";
import { useAuthStore } from "../store/authStore";
import { userService } from "../api/user/user.service";

const NativeStack = createNativeStackNavigator();

const HomeScreen = () => {
	const auth = useAuthStore();

	//TEMPORARY
	const getUserInfo = async () => {
		try {
			const userInfo = await userService.getUserInfo();
			// handle userInfo if needed
			console.log(userInfo, "userInfo");
			return userInfo;
		} catch (error) {
			console.log(error.response.data, "error");
		}
	};
	useEffect(() => {
		getUserInfo();
	}, []);

	return (
		<View>
			<Text>HomeScreen</Text>
			<Button title="Wyloguj" onPress={auth.logout} />
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
