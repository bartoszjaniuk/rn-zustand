import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';

export type RootRouteProps<TParamList extends ParamListBase, TRouteName extends keyof TParamList> = RouteProp<
  TParamList,
  TRouteName
>;

export const useRouteParams = <TParamList extends ParamListBase, TRouteName extends keyof TParamList>() => {
  const route = useRoute<RootRouteProps<TParamList, TRouteName>>();
  return route.params!;
};
