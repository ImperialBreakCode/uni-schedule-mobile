import { AppData, DataItem } from "@/models/listTypes";
import { ScheduleItemType, Week, WeekDay } from "@/models/scheduleTypes";

const dayData: DataItem[] = [
	{
		id: "dsdf",
		name: "name1 name name",
		room: "200",
		startHour: 2,
		type: ScheduleItemType.Lab,
		week: Week.Odd,
	},
	{
		id: "dsdf0",
		name: "AAAAAA name name",
		room: "200",
		startHour: 4,
		type: ScheduleItemType.Lab,
		week: Week.Even,
	},
	{
		id: "dsd99f",
		name: "name1 name",
		room: "200",
		startHour: 6,
		type: ScheduleItemType.Lab,
		week: Week.Every,
	},
	6,
	{
		id: "ds8151df",
		name: "name1 name",
		room: "200",
		startHour: 8,
		type: ScheduleItemType.Lab,
		week: Week.Every,
	},
];

const editData: DataItem[] = [
	{
		id: "dsdf",
		name: "name1 name name",
		room: "200",
		startHour: 2,
		type: ScheduleItemType.Lab,
		week: Week.Odd,
	},
	{
		id: "dsdf0",
		name: "AAAAAA name name",
		room: "200",
		startHour: 4,
		type: ScheduleItemType.Lab,
		week: Week.Even,
	},
	{
		id: "dsd99f",
		name: "name1 name",
		room: "200",
		startHour: 6,
		type: ScheduleItemType.Lab,
		week: Week.Every,
	},
];

export const data: AppData = [
	{
		day: WeekDay.Monday,
		dayData: dayData,
	},
	{
		day: WeekDay.Thursday,
		dayData: dayData,
	},
	{
		day: WeekDay.Wednesday,
		dayData: dayData,
	},
	{
		day: WeekDay.Friday,
		dayData: dayData,
	},
];

export const forEdit: AppData = [
	{
		day: WeekDay.Monday,
		dayData: editData,
	},
	{
		day: WeekDay.Thursday,
		dayData: editData,
	},
];
