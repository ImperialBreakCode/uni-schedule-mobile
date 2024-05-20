import { Colors } from "@/constants/Colors";
import AppText from "@/elements/AppText";
import { Ionicons } from "@expo/vector-icons";
import React, { ReactNode, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

function Collapsable({
	children,
	title,
}: {
	children: ReactNode;
	title: string;
}) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<View style={styles.view}>
			<TouchableOpacity
				style={styles.heading}
				onPress={() => setIsOpen(value => !value)}
				activeOpacity={0.8}
			>
				<Ionicons
					name={isOpen ? "chevron-down" : "chevron-forward-outline"}
					size={25}
					color={Colors.whiteFontColor}
				/>
				<AppText style={styles.title}>{title}</AppText>
			</TouchableOpacity>
			{isOpen && <View style={styles.content}>{children}</View>}
		</View>
	);
}

const styles = StyleSheet.create({
	heading: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	content: {
		marginTop: 6,
		marginLeft: 10,
	},
	title: {
		fontSize: 30,
		textTransform: "capitalize",
		color: Colors.whiteFontColor,
	},
	view: {
		padding: 20,
	},
});

export default Collapsable;
