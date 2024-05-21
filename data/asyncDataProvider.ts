import { DataProviderInterface } from "@/models/dataInterfaces";
import { AppData, DataItem } from "@/models/listTypes";
import { Subject, Week, WeekDay } from "@/models/scheduleTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AsyncDataProvider implements DataProviderInterface {
	private _scheduleKey: string = "schedule_storage";
	private _seedData: AppData;
	private _startingDate: Date;

	constructor(seedData: AppData) {
		this._seedData = seedData;
		this._startingDate = new Date(2024, 1, 5);
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

	async getTodaysSchedule(): Promise<DataItem[]> {
		const todaysInfo = this.getTodaysInfo();

		const fullSchedule = await this.getWeekData();
		let todaysSchedule = fullSchedule.filter(
			x => x.day === todaysInfo.dayName
		);

		let processedSchedule =
			this.processScheduleData(todaysSchedule)[0].dayData;

		return processedSchedule.filter(x =>
			typeof x !== "number" &&
			x.week !== Week.Every &&
			x.week !== todaysInfo.weekType
				? false
				: true
		);
	}

	async getWeekData(): Promise<AppData> {
		const dataJson = await AsyncStorage.getItem(this._scheduleKey);
		let data: AppData = [];

		if (dataJson) {
			data = JSON.parse(dataJson);
			data = data.filter(x => x.dayData.length !== 0);
		}

		return data;
	}

	async getProcessedWeekData(): Promise<AppData> {
		const data = await this.getWeekData();

		return this.processScheduleData(data);
	}

	private getTodaysInfo(): { weekType: Week; dayName: WeekDay } {
		const diff = Math.abs(
			new Date().getTime() - this._startingDate.getTime()
		);
		const diffInDays = Math.ceil(diff / (1000 * 3600 * 24));
		const week = Math.floor(diffInDays / 7);
		let dayOfWeek = diffInDays % 7;
		dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

		const weekDayName = Object.keys(WeekDay)[dayOfWeek];

		return {
			weekType: (week + 1) % 2 === 0 ? Week.Even : Week.Odd,
			dayName: WeekDay[weekDayName as keyof typeof WeekDay],
		};
	}

	private processScheduleData(data: AppData): AppData {
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
