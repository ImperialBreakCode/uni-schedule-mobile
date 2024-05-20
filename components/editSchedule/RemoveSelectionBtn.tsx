import React from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RemoveSelectionBtnProps {
	onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

function RemoveSelectionBtn({ onPress }: RemoveSelectionBtnProps) {
	return (
		<TouchableOpacity onPress={onPress}>
			<Ionicons
				style={{
					transform: "rotate(45deg)",
					marginRight: 20,
					marginTop: 2,
				}}
				name='add'
				size={30}
				color='white'
			/>
		</TouchableOpacity>
	);
}

export default RemoveSelectionBtn;
