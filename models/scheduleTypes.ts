export enum Week {
	Even = "Even",
	Odd = "Odd",
	Every = "Every",
}

export enum WeekDay {
	Monday = "Monday",
	Tuesday = "Tuesday",
	Wednesday = "Wednesday",
	Thursday = "Thursday",
	Friday = "Friday",
	Saturday = "Saturday",
	Sunday = "Sunday",
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

export type SubjectWithDay = Subject & {
	day: WeekDay;
};
