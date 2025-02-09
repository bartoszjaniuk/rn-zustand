import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { RootNavigator } from "./navigation/RootNavigator";
import { AuthNavigator } from "./navigation/AuthNavigator";
import { AnimatedSplashScreen } from "./shared/SplashScreen";
import { useAuthStore } from "./store/authStore";

const NativeStack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

const App = () => {
	const auth = useAuthStore();

	if (auth.isLoading) return <AnimatedSplashScreen />;

	return (
		<NativeStack.Navigator>
			{!auth.accessToken ? (
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
