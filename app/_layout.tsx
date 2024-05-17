import { Colors } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		Urbanist: require("../assets/fonts/Urbanist-Regular.ttf"),
		UrbanistSemiBold: require("../assets/fonts/Urbanist-SemiBold.ttf"),
		UrbanistLight: require("../assets/fonts/Urbanist-Light.ttf"),
		UrbanistItalic: require("../assets/fonts/Urbanist-Italic.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: Colors.viewBackgroundColor,
				},
				headerTintColor: Colors.whiteFontColor,
			}}
		/>
	);
}
