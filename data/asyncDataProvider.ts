import { DataProviderInterface } from "@/models/dataInterfaces";
import { AppData, DataItem } from "@/models/listTypes";
import { Subject } from "@/models/scheduleTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AsyncDataProvider implements DataProviderInterface {
	private _scheduleKey: string = "schedule_storage";
	private _seedData: AppData;

	constructor(seedData: AppData) {
		this._seedData = seedData;
	}

	async seedData(): Promise<void> {
		//AsyncStorage.clear();

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

	async getProcessedWeekData(): Promise<AppData> {
		const data = await this.getWeekData();
		const processedData: AppData = [];

		for (let i = 0; i < data.length; i++) {
			processedData.push({ day: data[i].day, dayData: [] });

			if (data[i].dayData.length > 0) {
				processedData[i].dayData.push(data[i].dayData[0]);
			}

			for (let j = 1; j < data[i].dayData.length; j++) {
				const precedingSubject = data[i].dayData[j - 1] as Subject;
				const currentSubject = data[i].dayData[j] as Subject;

				if (currentSubject.startHour - precedingSubject.startHour > 2) {
					processedData[i].dayData.push(
						currentSubject.startHour -
							precedingSubject.startHour -
							2
					);
				}

				processedData[i].dayData.push(data[i].dayData[j]);
			}
		}

		return processedData;
	}
}

export default AsyncDataProvider;
