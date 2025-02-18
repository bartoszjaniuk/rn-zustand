import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { View, Text, Button, TextInput, Image } from 'react-native';
import {
  NavigationContainer,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';

type DynamicParamList = {
  // HomeTabs: undefined;
  // Profile: { user: string };
  // Settings: undefined;
  // NotFound: undefined;
  Home: { postId: string };
  Details: { user: string };
  CreatePost: undefined;
  UlumuluStyled: undefined;
  WithHeaderCustomComponent: undefined;
  HeaderWithButton: undefined;
};

// Use the dynamic parameter list in the global namespace declaration
declare global {
  namespace ReactNavigation {
    interface RootParamList extends DynamicParamList {}
  }
}

// navigation: NativeStackNavigationProp<MyCustomNavigatorType>;

const HomeScreen = ({
  route,
}: {
  route: RouteProp<DynamicParamList, 'Home'>;
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<DynamicParamList>>();

  const handleNavigate = () => {
    navigation.navigate('Details', { user: 'John Doe' });
  };

  // Use an effect to monitor the update to params
  React.useEffect(() => {
    if (route.params?.postId) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      alert('New post: ' + route.params?.postId);
    }
  }, [route.params?.postId]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text style={{ margin: 10 }}>Post: {route.params?.postId}</Text>
      <Button title="Navigate to DETAILS" onPress={handleNavigate} />
      <Button
        onPress={() => navigation.navigate('CreatePost')}
        title="Navigate to CREATE POST"
      />
      <Button
        onPress={() => navigation.navigate('UlumuluStyled')}
        title="Navigate to UlumuluStyled"
      />
      <Button
        onPress={() => navigation.navigate('WithHeaderCustomComponent')}
        title="Navigate to WithHeaderCustomComponent"
      />
      <Button
        onPress={() => navigation.navigate('HeaderWithButton')}
        title="Navigate to HeaderWithButton"
      />
    </View>
  );
};

const DetailsScreen = ({
  route,
}: {
  route: RouteProp<DynamicParamList, 'Details'>;
}) => {
  const { user } = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<DynamicParamList>>();

  const handlePush = () => {
    navigation.push('Details', { user: 'John Doe' });
  };

  const handleUpdateParams = () => {
    navigation.setParams({ user: 'Jane Doe' });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen {user}</Text>
      <Button title="Navigate to DETAILS" onPress={handlePush} />
      <Button title="Update params" onPress={handleUpdateParams} />
    </View>
  );
};

const CreatePostScreen = ({
  route,
}: {
  route: RouteProp<DynamicParamList, 'CreatePost'>;
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<DynamicParamList>>();
  const [postId, setPostId] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postId}
        onChangeText={setPostId}
      />
      <Button
        onPress={() => {
          // Pass params back to home screen
          navigation.popTo('Home', { postId: postId });
        }}
        title="Done"
      />
    </>
  );
};

const WithHeaderCustomComponentScreen = () => {
  return (
    <View>
      <Text>WithHeaderCustomComponentScreen</Text>
    </View>
  );
};

const UlumuluStyledScreen = () => {
  return (
    <View>
      <Text>UlumuluStyledScreen</Text>
    </View>
  );
};

const HeaderWithButtonScreen = () => {
  const navigation = useNavigation();
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount((c) => c + 1)} title="Update count" />
      ),
    });
  }, [navigation]);

  return <Text>Count: {count}</Text>;
};

const DynamicRootStack = createNativeStackNavigator<DynamicParamList>();

const DynamicNavigation: React.FC = () => {
  return (
    <DynamicRootStack.Navigator initialRouteName="Home">
      <DynamicRootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Title ekranu Home',
        }}
      />
      <DynamicRootStack.Screen
        name="Details"
        component={DetailsScreen}
        initialParams={{ user: 'John Doe' }}
      />
      <DynamicRootStack.Screen name="CreatePost" component={CreatePostScreen} />
      <DynamicRootStack.Screen
        name="UlumuluStyled"
        component={UlumuluStyledScreen}
        options={{
          title: 'UlumuluStyled',
          headerStyle: {
            backgroundColor: 'purple',
          },
          headerTintColor: 'green',
          headerTitleStyle: {
            fontWeight: '900',
          },
        }}
      />
      <DynamicRootStack.Screen
        name="WithHeaderCustomComponent"
        component={WithHeaderCustomComponentScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerBackTitle: 'Custom Back',
          headerBackTitleStyle: { fontSize: 30 },
        }}
      />
      <DynamicRootStack.Screen
        name="HeaderWithButton"
        component={HeaderWithButtonScreen}
        options={{
          headerTitle: 'HeaderWithButton',
        }}
      />
    </DynamicRootStack.Navigator>
  );
};

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('./assets/newspaper.png')}
    />
  );
}

export const PlaygroundNavigator = () => {
  return (
    <NavigationContainer
      linking={{
        enabled: true,
        prefixes: [
          // Change the scheme to match your app's scheme defined in app.json
          'helloworld://',
        ],
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    >
      <DynamicNavigation />
    </NavigationContainer>
  );
};
