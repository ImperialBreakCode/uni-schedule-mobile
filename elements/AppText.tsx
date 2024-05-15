import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

type AppTextProps = TextProps;

function AppText({ children, style }: AppTextProps) {
	const styles: StyleProp<TextStyle> = {
		...(style as Object),
		...{
			fontFamily: "Urbanist",
		},
	};

	return <Text style={styles}>{children}</Text>;
}

export default AppText;
