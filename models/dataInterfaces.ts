import { AppData, DataItem } from "./listTypes";
import { EditorData, Subject, SubjectWithDay } from "./scheduleTypes";

export interface DataProviderInterface {
	seedData(): Promise<void>;
	getWeekData(): Promise<AppData>;
	getProcessedWeekData(): Promise<AppData>;
	getTodaysSchedule(): Promise<DataItem[]>;
	getById(id: string): Promise<SubjectWithDay | null>;
	saveData(data: EditorData): Promise<string | null>;
	deleteById(id: string): Promise<Subject | null>;
	updateItem(data: EditorData): Promise<string | null>;
}
