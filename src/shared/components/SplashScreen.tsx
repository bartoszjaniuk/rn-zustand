import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";

export const AnimatedSplashScreen = () => {
	const animationRef = useRef<LottieView>(null);

	useEffect(() => {
		animationRef.current?.play();

		// Or set a specific startFrame and endFrame with:
		animationRef.current?.play(30, 120);
	}, []);

	return (
		<LottieView
			source={require("../assets/splash-screen.json")}
			style={{ width: "100%", height: "100%" }}
			ref={animationRef}
		/>
	);
};
