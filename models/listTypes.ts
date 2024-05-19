import { Subject } from "./scheduleTypes";

export type AppData = {
	day: string;
	dayData: DataItem[];
}[];

export type DataItem = Subject | number;
