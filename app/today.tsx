import { Colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";
import { NativeStackNavigationOptions } from "react-native-screens/lib/typescript/native-stack/types";

function Today() {
	const navigation = useNavigation();

	const options: NativeStackNavigationOptions = {
		headerStyle: {
			backgroundColor: Colors.blackFontColor,
		},
	};

	useEffect(() => {
		navigation.setOptions(options);
	}, [navigation]);

	return <Text>hello from today</Text>;
}

export default Today;
