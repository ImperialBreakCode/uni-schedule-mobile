import { AppData } from "./listTypes";

export interface DataProviderInterface {
	seedData(): Promise<void>;
	getWeekData(): Promise<AppData>;
	getProcessedWeekData(): Promise<AppData>;
}
