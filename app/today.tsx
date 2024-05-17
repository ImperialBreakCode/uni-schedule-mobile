import SubjectBox from "@/components/shared/SubjectBox";
import ScreenView from "@/elements/ScreenView";
import { ScheduleItemType, Subject, Week } from "@/models/scheduleTypes";
import { Text, View } from "react-native";

function Today() {
	const subject: Subject = {
		name: "Специализиран английски език II част",
		room: "505",
		startHour: 12,
		type: ScheduleItemType.Sem,
		week: Week.Every,
	};

	return (
		<ScreenView>
			<View>
				<SubjectBox
					subject={subject}
					hue='200'
				/>
				<SubjectBox
					subject={subject}
					hue='20'
				/>
				<SubjectBox
					subject={subject}
					hue='100'
				/>
			</View>
		</ScreenView>
	);
}

export default Today;
