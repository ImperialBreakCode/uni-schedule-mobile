import Gap from "@/components/shared/Gap";
import SubjectBox from "@/components/shared/SubjectBox";
import ScreenView from "@/elements/ScreenView";
import { ScheduleItemType, Subject, Week } from "@/models/scheduleTypes";
import { View } from "react-native";

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
				<SubjectBox subject={subject} />
				<SubjectBox subject={subject} />
				<Gap hoursGap={4} />
				<SubjectBox subject={subject} />
			</View>
		</ScreenView>
	);
}

export default Today;
