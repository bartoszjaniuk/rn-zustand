import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailsScreen } from "../screens/details/Details";
import { HomeScreen } from "../screens/home/Home";
import { ProfileScreen } from "../screens/profile/Profile";

// type DynamicParamList = {
// 	// HomeTabs: undefined;
// 	// Profile: { user: string };
// 	// Settings: undefined;
// 	// NotFound: undefined;
// 	Home: { postId: string };
// 	Details: { user: string };
// 	CreatePost: undefined;
// 	UlumuluStyled: undefined;
// 	WithHeaderCustomComponent: undefined;
// 	HeaderWithButton: undefined;
// };

// // Use the dynamic parameter list in the global namespace declaration
// declare global {
// 	namespace ReactNavigation {
// 		interface RootParamList extends DynamicParamList {}
// 	}
// }

export type RootParamList = {
  Home: undefined;
  Details: { user: string };
  Profile: undefined;
};

const NativeStack = createNativeStackNavigator<RootParamList>();

export const RootNavigator = () => {
  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      <NativeStack.Screen name="Home" component={HomeScreen} />
      <NativeStack.Screen name="Details" component={DetailsScreen} />
      <NativeStack.Screen name="Profile" component={ProfileScreen} />
    </NativeStack.Navigator>
  );
};
