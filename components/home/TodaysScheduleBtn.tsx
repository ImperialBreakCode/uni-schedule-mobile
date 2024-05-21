import { Colors } from "@/constants/Colors";
import AppText from "@/elements/AppText";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { DataContext } from "@/app/_layout";
import { Subject } from "@/models/scheduleTypes";

function TodaysScheduleBtn() {
	const dataContext = useContext(DataContext);

	const [subjectNext, setSubjectNext] = useState<Subject | null>();

	useEffect(() => {
		async function initData() {
			const nextSubjects = (await dataContext.getTodaysSchedule()).filter(
				x =>
					typeof x !== "number" && x.startHour > new Date().getHours()
			);

			setSubjectNext(
				nextSubjects.length > 0 ? (nextSubjects[0] as Subject) : null
			);
		}

		initData();
	}, []);

	return (
		<View style={styles.buttonWrapper}>
			<View style={styles.infoBox}>
				{subjectNext ? (
					<>
						<AppText style={styles.nowIdicator}>Next:</AppText>
						<AppText style={styles.subjectInfo}>
							{subjectNext.name}
						</AppText>
						<AppText style={styles.infoHours}>
							{subjectNext.startHour}:15 -{" "}
							{subjectNext.startHour + 2}:00
						</AppText>
					</>
				) : (
					""
				)}
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
