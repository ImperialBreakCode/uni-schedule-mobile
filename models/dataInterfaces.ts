import { AppData, DataItem } from "./listTypes";

export interface DataProviderInterface {
	seedData(): Promise<void>;
	getWeekData(): Promise<AppData>;
	getProcessedWeekData(): Promise<AppData>;
	getTodaysSchedule(): Promise<DataItem[]>;
}
