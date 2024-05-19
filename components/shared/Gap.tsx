import { StyleSheet, View } from "react-native";
import React from "react";
import AppText from "@/elements/AppText";
import { Colors } from "@/constants/Colors";

const Gap = ({ hoursGap }: { hoursGap: number }) => {
	return (
		<View style={styles.gapView}>
			<AppText style={styles.gapText}>{hoursGap}h and 15min gap</AppText>
		</View>
	);
};

const styles = StyleSheet.create({
	gapText: {
		color: Colors.whiteFontColor,
		fontSize: 20,
		textAlign: "center",
	},
	gapView: {
		padding: 20,
		marginVertical: 5,
	},
});

export default Gap;
