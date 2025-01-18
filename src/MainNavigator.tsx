import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useAuth } from "./providers/auth";
import { ActivityIndicator, Text, View } from "react-native";
import { RootNavigator } from "./navigation/RootNavigator";
import { AuthNavigator } from "./navigation/AuthNavigator";

const NativeStack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

const LoadingScreen = () => <Text>Loading...</Text>;

const App = () => {
	const auth = useAuth();
	if (auth.isLoading) return <LoadingScreen />;

	return (
		<NativeStack.Navigator>
			{!auth.session ? (
				<NativeStack.Screen
					name="auth"
					component={AuthNavigator}
					options={{ title: "Niezalogowany użytkownik" }}
				/>
			) : (
				<NativeStack.Screen
					name="root"
					component={RootNavigator}
					options={{ title: "Zalogowany użytkownik" }}
				/>
			)}
		</NativeStack.Navigator>
	);
};

export const MainNavigator = () => {
	return (
		<NavigationContainer
			linking={{
				enabled: true,
				prefixes: [
					// Change the scheme to match your app's scheme defined in app.json
					"helloworld://",
				],
			}}
			onReady={() => {
				SplashScreen.hideAsync();
			}}
		>
			<App />
		</NavigationContainer>
	);
};
