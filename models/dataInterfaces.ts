import { AppData, DataItem } from "./listTypes";
import { EditorData, SubjectWithDay } from "./scheduleTypes";

export interface DataProviderInterface {
	seedData(): Promise<void>;
	getWeekData(): Promise<AppData>;
	getProcessedWeekData(): Promise<AppData>;
	getTodaysSchedule(): Promise<DataItem[]>;
	getById(id: string): Promise<SubjectWithDay | null>;
	saveData(data: EditorData): Promise<string | null>;
}
