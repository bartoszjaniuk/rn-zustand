import * as React from 'react';
import { Button, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useUserInfoQuery } from '../../../../api/user/hooks/useUserInfoQuery';
import { AnimatedSplashScreen } from '../../../../shared/components/SplashScreen';
import { useAuthStore } from '../../../../store/authStore';

export const HomeScreen = () => {
  const auth = useAuthStore();
  const navigate = useNavigation();

  const userInfoQuery = useUserInfoQuery();

  if (userInfoQuery.isLoading) return <AnimatedSplashScreen />;

  return (
    <View>
      <Text>HomeScreen - {userInfoQuery.data?.email}</Text>
      <Button
        title="Go to details"
        onPress={() => navigate.navigate('Details', { user: 'John Doe' })}
      />
      <Button title="Wyloguj" onPress={auth.logout} />
    </View>
  );
};
