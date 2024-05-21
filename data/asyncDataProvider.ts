import { DataProviderInterface } from "@/models/dataInterfaces";
import { AppData } from "@/models/listTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AsyncDataProvider implements DataProviderInterface {
	private _scheduleKey: string = "schedule_storage";
	private _seedData: AppData;

	constructor(seedData: AppData) {
		this._seedData = seedData;
	}

	async seedData(): Promise<void> {
		AsyncStorage.clear();

		if (!(await AsyncStorage.getItem(this._scheduleKey))) {
			await AsyncStorage.setItem(
				this._scheduleKey,
				JSON.stringify(this._seedData)
			);
		}
	}

	async getWeekData(): Promise<AppData> {
		const dataJson = await AsyncStorage.getItem(this._scheduleKey);
		let data: AppData = [];

		if (dataJson) {
			data = JSON.parse(dataJson);
		}

		return data;
	}
}

export default AsyncDataProvider;
