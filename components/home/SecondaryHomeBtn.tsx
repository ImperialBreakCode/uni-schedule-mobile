import { Colors } from "@/constants/Colors";
import React, { ReactNode } from "react";
import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import HomePressableBtn from "./HomePressableBtn";

interface SecondaryHomeBtnProps {
	icon: ReactNode;
	children: ReactNode;
	onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
}

function SecondaryHomeBtn({ icon, children, onPress }: SecondaryHomeBtnProps) {
	return (
		<HomePressableBtn
			style={styles.secondaryBtn}
			onPress={onPress}
		>
			<Text style={styles.icon}>{icon}</Text>
			<Text style={styles.text}>{children}</Text>
		</HomePressableBtn>
	);
}

const styles = StyleSheet.create({
	secondaryBtn: {
		backgroundColor: Colors.secondaryColor,
		paddingVertical: 30,
		flexDirection: "column",
		alignItems: "center",
		borderRadius: 40,
		marginHorizontal: 2,
	},
	icon: {
		marginBottom: 15,
	},
	text: {
		fontSize: 15,
	},
});

export default SecondaryHomeBtn;
