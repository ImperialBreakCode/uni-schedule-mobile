import React from "react";
import AppText from "@/elements/AppText";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";

interface WeekTypeBtnProps {
	text: string;
	onPress?:
		| (((event: GestureResponderEvent) => void) & (() => void))
		| undefined;
}

const WeekTypeBtn = ({ text, onPress }: WeekTypeBtnProps) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<AppText
				style={{
					color: Colors.whiteFontColor,
					fontSize: 18,
				}}
			>
				{text} week
			</AppText>
		</TouchableOpacity>
	);
};

export default WeekTypeBtn;
