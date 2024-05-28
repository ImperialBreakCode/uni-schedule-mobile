import { EditorData, Subject, WeekDay } from "@/models/scheduleTypes";

export function convertEditorDataToSubject(data: EditorData): Subject {
	const subject: Subject = {
		id: data.id ?? Date.now() + "d" + Math.random(),
		startHour: Number(data.startingHour),
		week: data.weekType!,
		type: data.subjectType!,
		name: data.name,
		room: data.room,
	};

	return subject;
}

export function convertSubjectToEditorData(
	subject: Subject,
	day: WeekDay
): EditorData {
	return {
		day: day,
		id: subject.id,
		name: subject.name,
		room: subject.room,
		startingHour: subject.startHour.toString(),
		subjectType: subject.type,
		weekType: subject.week,
	};
}
