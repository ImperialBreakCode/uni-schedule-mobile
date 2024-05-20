export enum Week {
	Even = "Even",
	Odd = "Odd",
	Every = "Every",
}

export enum ScheduleItemType {
	Sem = "Sem",
	Lec = "Lecture",
	Lab = "Lab",
}

export type Subject = {
	id: string;
	startHour: number;
	week: Week;
	room: string;
	name: string;
	type: ScheduleItemType;
};
