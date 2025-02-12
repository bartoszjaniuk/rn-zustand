import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ErrorBoundary from "react-native-error-boundary";
import { StyleSheet, View } from "react-native";
import { enableFreeze } from "react-native-screens";
import { MainNavigator } from "./MainNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

Asset.loadAsync([
	...NavigationAssets,
	require("./assets/newspaper.png"),
	require("./assets/bell.png"),
]);

enableFreeze(true); // avoid unnecessary re-renders of parts of the app that are not visible to the user at a given moment.

SplashScreen.preventAutoHideAsync();

const queyClient = new QueryClient();

const AppProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queyClient}>{children}</QueryClientProvider>
	);
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
