import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Text, View } from "react-native";
import { RootParamList } from "../../navigation/navigators";

// import { useRoute } from '@react-navigation/native';

// export const useRouteParams = <T extends Route<unknown>>(_: T): RouteParams<T> => {
//   const route = useRoute();
//   return (route.params ?? {}) as unknown as RouteParams<T>;
// };

export function useRouteParams<
  T extends ParamListBase,
  RouteName extends keyof T
>(): T[RouteName] {
  const route = useRoute<RouteProp<T, RouteName>>();
  return (route.params ?? {}) as unknown as T[RouteName];
}

export const DetailsScreen = ({}) => {
  const routeParams = useRouteParams<RootParamList, "Details">();
  return (
    <View>
      <Text>DetailsScreen - {routeParams.user}</Text>
    </View>
  );
};
