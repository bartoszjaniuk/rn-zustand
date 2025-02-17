import * as React from "react";
import { View, Button, Text } from "react-native";
import { useAuthStore } from "../../../store/authStore";
import { useUserInfoQuery } from "../../../api/user/hooks/useUserInfoQuery";
import { AnimatedSplashScreen } from "../../../shared/SplashScreen";
import { useNavigation } from "@react-navigation/native";

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
        onPress={() => navigate.navigate("Details", { user: "John Doe" })}
      />
      <Button title="Wyloguj" onPress={auth.logout} />
    </View>
  );
};
