import React from "react";
import {
	GestureResponderEvent,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

interface RightHeaderButtonsProps {
	onDeletePress?: ((event: GestureResponderEvent) => void) | undefined;
	onEditPress?: ((event: GestureResponderEvent) => void) | undefined;
}

function RightHeaderButtons({
	onDeletePress,
	onEditPress,
}: RightHeaderButtonsProps) {
	return (
		<>
			<TouchableOpacity
				style={styles.icon}
				onPress={onEditPress}
			>
				<Feather
					name='edit-2'
					size={20}
					color='white'
				/>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.icon}
				onPress={onDeletePress}
			>
				<AntDesign
					name='delete'
					size={20}
					color='white'
				/>
			</TouchableOpacity>
		</>
	);
}

const styles = StyleSheet.create({
	icon: {
		marginTop: 2,
		padding: 10,
	},
});

export default RightHeaderButtons;
