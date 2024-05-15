import { Colors } from "@/constants/Colors";
import AppText from "@/elements/AppText";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";

function TodaysScheduleBtn() {
	return (
		<View style={styles.buttonWrapper}>
			<View style={styles.btnFooter}>
				<AppText style={styles.footerText}>Today's schedule</AppText>
				<Feather
					name='arrow-right'
					size={40}
					color='black'
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonWrapper: {
		backgroundColor: Colors.primaryColor,
		padding: 20,
		borderRadius: 40,
	},
	btnFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	footerText: {
		fontSize: 30,
	},
});

export default TodaysScheduleBtn;
