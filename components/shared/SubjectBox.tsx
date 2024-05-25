import { Colors } from "@/constants/Colors";
import AppText from "@/elements/AppText";
import { Subject } from "@/models/scheduleTypes";
import { StyleSheet, View } from "react-native";

function getHue(subName: string) {
	let value = 0;

	for (let i = 0; i < subName.length; i++) {
		value += subName.charCodeAt(i);
	}

	value %= 500;

	return value;
}

interface SubjectBoxProps {
	subject: Subject;
	showWeek?: boolean;
	selected?: boolean;
}

function SubjectBox({ subject, showWeek, selected }: SubjectBoxProps) {
	return (
		<View
			style={[
				style.box,
				{
					backgroundColor: selected
						? Colors.whiteFontColor
						: `hsl(${getHue(subject.name)}, 40%, 60%)`,
				},
			]}
		>
			<View style={style.boxHeader}>
				<View style={style.hourRange}>
					<View style={style.timeWrapper}>
						<AppText style={style.baseTime}>
							{subject.startHour}
						</AppText>
						<AppText style={[style.baseTime, style.minute]}>
							15
						</AppText>
					</View>

					<View style={style.timeDash} />

					<View style={style.timeWrapper}>
						<AppText style={style.baseTime}>
							{subject.startHour + 2}
						</AppText>
						<AppText style={[style.baseTime, style.minute]}>
							00
						</AppText>
					</View>
				</View>

				<View style={{ flexShrink: 1 }}>
					<AppText style={style.name}>{subject.name}</AppText>
				</View>
			</View>

			<View style={style.boxFooter}>
				<AppText>
					room
					<AppText style={style.moreInfo}> {subject.room}</AppText>
				</AppText>
				<AppText>
					type
					<AppText style={style.moreInfo}> {subject.type}</AppText>
				</AppText>
				{showWeek ? (
					<AppText>
						week
						<AppText style={style.moreInfo}>
							{" "}
							{subject.week}
						</AppText>
					</AppText>
				) : (
					""
				)}
			</View>
		</View>
	);
}

const style = StyleSheet.create({
	box: {
		padding: 20,
		borderRadius: 40,
		marginVertical: 5,
	},
	boxHeader: {
		flexDirection: "row",
	},
	hourRange: {
		paddingRight: 20,
		alignItems: "center",
	},
	timeWrapper: {
		alignItems: "center",
	},
	baseTime: {
		fontSize: 20,
		fontFamily: "UrbanistSemiBold",
	},
	minute: {
		fontSize: 14,
		lineHeight: 14,
	},
	timeDash: {
		height: 15,
		marginTop: 5,
		borderLeftWidth: 2,
		borderLeftColor: Colors.blackFontColor,
		borderStyle: "dotted",
	},
	name: {
		marginLeft: 10,
		fontSize: 25,
		flexShrink: 1,
	},
	boxFooter: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 10,
	},
	moreInfo: {
		fontFamily: "UrbanistSemiBold",
		fontSize: 15,
	},
});

export default SubjectBox;
