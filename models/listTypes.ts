import { Subject, WeekDay } from "./scheduleTypes";

export type AppData = {
	day: WeekDay;
	dayData: DataItem[];
}[];

export type DataItem = Subject | number;
