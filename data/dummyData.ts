import { AppData, DataItem } from "@/models/listTypes";
import { ScheduleItemType, Week } from "@/models/scheduleTypes";

const dayData: DataItem[] = [
	{
		name: "name1 name name",
		room: "200",
		startHour: 2,
		type: ScheduleItemType.Lab,
		week: Week.Odd,
	},
	{
		name: "AAAAAA name name",
		room: "200",
		startHour: 4,
		type: ScheduleItemType.Lab,
		week: Week.Even,
	},
	{
		name: "name1 name",
		room: "200",
		startHour: 6,
		type: ScheduleItemType.Lab,
		week: Week.Even,
	},
	6,
	{
		name: "name1 name",
		room: "200",
		startHour: 8,
		type: ScheduleItemType.Lab,
		week: Week.Even,
	},
];

export const data: AppData = [
	{
		day: "monday",
		dayData: dayData,
	},
	{
		day: "tuesday",
		dayData: dayData,
	},
	{
		day: "wednesday",
		dayData: dayData,
	},
	{
		day: "friday",
		dayData: dayData,
	},
];
