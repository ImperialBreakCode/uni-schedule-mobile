import { AppData, DataItem } from "./listTypes";
import { SubjectWithDay } from "./scheduleTypes";

export interface DataProviderInterface {
	seedData(): Promise<void>;
	getWeekData(): Promise<AppData>;
	getProcessedWeekData(): Promise<AppData>;
	getTodaysSchedule(): Promise<DataItem[]>;
	getById(id: string): Promise<SubjectWithDay | null>;
}
