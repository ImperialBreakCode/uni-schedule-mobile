import { AppData, DataItem } from "@/models/listTypes";
import { ScheduleItemType, Week } from "@/models/scheduleTypes";

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

export const forEdit: AppData = [
	{
		day: "monday",
		dayData: editData,
	},
	{
		day: "tuesday",
		dayData: editData,
	},
];
