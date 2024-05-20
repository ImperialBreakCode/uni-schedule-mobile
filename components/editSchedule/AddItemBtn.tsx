import React from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AddItemBtnProps {
	onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

function AddItemBtn({ onPress }: AddItemBtnProps) {
	return (
		<TouchableOpacity onPress={onPress}>
			<Ionicons
				style={{
					marginTop: 2,
				}}
				name='add'
				size={30}
				color='white'
			/>
		</TouchableOpacity>
	);
}

export default AddItemBtn;
