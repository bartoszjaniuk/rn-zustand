import { Button, Text, View } from "react-native";
import { useLoginMutation } from "../../../../api/auth/hooks/useLoginMutation";
import { useAuthStore } from "../../../../store/authStore";
import { LoginWithGoogle } from "../../../../components/LoginWithGoogle/LoginWithGoogle";

export const WelcomeScreen = () => {
	const auth = useAuthStore();

	const onLoginSuccess = (data: {
		accessToken: string;
		refreshToken: string;
	}) => {
		auth.setTokens(data.accessToken, data.refreshToken);
	};

	const loginMutation = useLoginMutation(onLoginSuccess);

	const handleLogin = () => {
		loginMutation.mutate({ email: "user@gg.pl", password: "password" });
	};

	return (
		<View>
			<Text>WelcomeScreen</Text>
			{loginMutation.error ? (
				<Text>{loginMutation.error.response?.data.message}</Text>
			) : null}
			<Button title="Login" onPress={handleLogin} />
			<LoginWithGoogle />
		</View>
	);
};
