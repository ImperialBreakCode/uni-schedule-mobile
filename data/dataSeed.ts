import { AppData, DataItem } from "@/models/listTypes";
import { ScheduleItemType, Week, WeekDay } from "@/models/scheduleTypes";

const dataObject: { [key: string]: DataItem[] } = {
	Monday: [
		{
			id: "seed-1",
			startHour: 8,
			week: Week.Odd,
			room: "401",
			type: ScheduleItemType.Lec,
			name: "Мобилни приложения за Android",
		},
		{
			id: "seed-2",
			startHour: 8,
			week: Week.Even,
			room: "401",
			type: ScheduleItemType.Lec,
			name: "Шаблони за софтуерен дизайн I част",
		},
		{
			id: "seed-3",
			startHour: 10,
			week: Week.Every,
			room: "401",
			type: ScheduleItemType.Lec,
			name: "Алгоритми и структури от данни",
		},
		{
			id: "seed-4",
			startHour: 18,
			week: Week.Every,
			room: "403",
			type: ScheduleItemType.Lab,
			name: "Осигуряване на качество на софтуера",
		},
	],
	Tuesday: [
		{
			id: "seed-5",
			startHour: 8,
			week: Week.Even,
			room: "401",
			type: ScheduleItemType.Lec,
			name: "JavaScript базирани технологии",
		},
		{
			id: "seed-6",
			startHour: 8,
			week: Week.Odd,
			room: "401",
			type: ScheduleItemType.Lec,
			name: "Осигуряване на качество на софтуера",
		},
		{
			id: "seed-7",
			startHour: 14,
			week: Week.Every,
			room: "402",
			type: ScheduleItemType.Lab,
			name: "JavaScript базирани технологии",
		},
	],
	Wednesday: [
		{
			id: "seed-8",
			startHour: 12,
			week: Week.Every,
			room: "403",
			type: ScheduleItemType.Lab,
			name: "Шаблони за софтуерен дизайн I част",
		},
		{
			id: "seed-9",
			startHour: 14,
			week: Week.Odd,
			room: "403",
			type: ScheduleItemType.Lab,
			name: "Шаблони за софтуерен дизайн I част",
		},
	],
	Thursday: [
		{
			id: "seed-10",
			startHour: 8,
			week: Week.Every,
			room: "402А",
			type: ScheduleItemType.Lab,
			name: "Мобилни приложения за Android",
		},
		{
			id: "seed-11",
			startHour: 12,
			week: Week.Even,
			room: "402",
			type: ScheduleItemType.Lab,
			name: "Алгоритми и структури от данни",
		},
		{
			id: "seed-13",
			startHour: 14,
			week: Week.Every,
			room: "402",
			type: ScheduleItemType.Lab,
			name: "Алгоритми и структури от данни",
		},
	],
	Friday: [
		{
			id: "seed-14",
			startHour: 8,
			week: Week.Every,
			room: "503",
			type: ScheduleItemType.Lec,
			name: "Математически анализ ІІ част",
		},
		{
			id: "seed-15",
			startHour: 12,
			week: Week.Every,
			room: "504",
			type: ScheduleItemType.Sem,
			name: "Математически анализ ІІ част",
		},
		{
			id: "seed-16",
			startHour: 14,
			week: Week.Every,
			room: "505",
			type: ScheduleItemType.Sem,
			name: "Специализиран английски език II част",
		},
	],
};

export const dataSeed: AppData = Object.keys(WeekDay).map(key => {
	return {
		day: WeekDay[key as keyof typeof WeekDay],
		dayData: dataObject[key],
	};
});
