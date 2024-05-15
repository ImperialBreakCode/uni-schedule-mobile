import { Colors } from "@/constants/Colors";
import AppText from "@/elements/AppText";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";

function TodaysScheduleBtn() {
	return (
		<View style={styles.buttonWrapper}>
			<View style={styles.infoBox}>
				<AppText style={styles.nowIdicator}>Now:</AppText>
				<AppText style={styles.subjectInfo}>
					Алгоритми и структури от данни
				</AppText>
				<AppText style={styles.infoHours}>12:15 - 14:00</AppText>
			</View>
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
		textTransform: "uppercase",
		fontFamily: "UrbanistItalic",
	},
	infoBox: {
		marginVertical: 15,
		marginHorizontal: 5,
		paddingHorizontal: 10,
		borderLeftColor: Colors.lightBlackColor,
		borderLeftWidth: 1,
	},
	subjectInfo: {
		fontSize: 17,
		fontFamily: "UrbanistLight",
	},
	infoHours: {
		fontSize: 25,
		fontWeight: 400,
		fontFamily: "UrbanistLight",
	},
	nowIdicator: {
		textTransform: "uppercase",
		marginBottom: 8,
		fontSize: 12,
	},
});

export default TodaysScheduleBtn;
