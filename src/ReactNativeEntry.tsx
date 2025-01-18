import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ErrorBoundary from "react-native-error-boundary";
import { StyleSheet, View } from "react-native";
import { enableFreeze } from "react-native-screens";
import { MainNavigator } from "./MainNavigator";
import { AuthProvider } from "./providers/auth";

Asset.loadAsync([
	...NavigationAssets,
	require("./assets/newspaper.png"),
	require("./assets/bell.png"),
]);

enableFreeze(true); // avoid unnecessary re-renders of parts of the app that are not visible to the user at a given moment.

SplashScreen.preventAutoHideAsync();

const AppProviders = ({ children }: { children: React.ReactNode }) => {
	return <AuthProvider>{children}</AuthProvider>;
};

const ErrorFallback = () => {
	return <View>ErrorFallback</View>;
};

export const ReactNativeEntry = () => {
	return (
		<GestureHandlerRootView style={styles.root}>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<AppProviders>
					<MainNavigator />
				</AppProviders>
			</ErrorBoundary>
		</GestureHandlerRootView>
	);
};

const styles = StyleSheet.create({
	root: {
		flexGrow: 1,
	},
});
