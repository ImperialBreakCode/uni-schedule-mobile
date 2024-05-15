import React from "react";
import { StyleProp, Text, TextProps } from "react-native";

type AppTextProps = TextProps;

function AppText({ children, style, ...rest }: AppTextProps) {
	return (
		<Text
			style={[
				{
					fontFamily: "Urbanist",
				},
				style,
			]}
			{...rest}
		>
			{children}
		</Text>
	);
}

export default AppText;
