import "./gesture-handler";

import "@expo/metro-runtime"; // Necessary for Fast Refresh on Web
import { registerRootComponent } from "expo";

import { ReactNativeEntry } from "./src/ReactNativeEntry";

// registerRootComponent calls ReactNativeEntryRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(ReactNativeEntry);
