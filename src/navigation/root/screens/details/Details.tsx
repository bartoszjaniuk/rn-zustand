import { Text, View } from 'react-native';
import { RootParamList } from '../../navigation/navigators';
import { useRouteParams } from '../../../../shared/utils/useRouteParams';

export const DetailsScreen = () => {
  const routeParams = useRouteParams<RootParamList, 'Details'>();
  return (
    <View>
      <Text>DetailsScreen - {routeParams.user}</Text>
    </View>
  );
};
