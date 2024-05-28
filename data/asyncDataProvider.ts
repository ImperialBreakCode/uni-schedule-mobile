import { DataProviderInterface } from "@/models/dataInterfaces";
import { AppData, DataItem } from "@/models/listTypes";
import {
	EditorData,
	Subject,
	SubjectWithDay,
	Week,
	WeekDay,
} from "@/models/scheduleTypes";
import { insertIntoArray } from "@/utils/appUtils";
import {
	convertEditorDataToSubject,
	convertSubjectToEditorData,
} from "@/utils/modelUtils";
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

	async updateItem(data: EditorData): Promise<string | null> {
		const oldDay = (await this.getById(data.id!))?.day;
		const deletedItem = await this.deleteById(data.id!);
		const error = await this.saveData(data);

		const deletedEditorData = convertSubjectToEditorData(
			deletedItem!,
			oldDay!
		);

		if (error) {
			await this.saveData(deletedEditorData);
		}

		return error;
	}

	async deleteById(id: string): Promise<Subject | null> {
		const data = await this.getWeekData();
		let deletedItem: Subject[] | null = null;

		for (let i = 0; i < data.length; i++) {
			let itemIndex = data[i].dayData.findIndex(
				x => (x as Subject).id === id
			);

			if (itemIndex !== -1) {
				deletedItem = data[i].dayData.splice(itemIndex, 1) as Subject[];
				break;
			}
		}

		await AsyncStorage.setItem(this._scheduleKey, JSON.stringify(data));

		if (deletedItem && deletedItem?.length > 0) {
			return deletedItem[0];
		}

		return null;
	}

	async saveData(data: EditorData): Promise<string | null> {
		let weekData = await this.getWeekData();

		const dayArr = weekData.filter(x => x.day === data.day);
		let dayData: DataItem[] = [];

		// creating day data if it doesn't exist
		if (dayArr.length === 0) {
			weekData = this.createDay(data.day!, weekData);
		} else {
			dayData = dayArr[0].dayData;
		}

		const checkForExistingItem = dayData.filter(
			x =>
				Math.abs((x as Subject).startHour - Number(data.startingHour)) <
					2 &&
				((x as Subject).week === Week.Every ||
					data.weekType === Week.Every ||
					(x as Subject).week === data.weekType)
		);

		if (checkForExistingItem.length > 0) {
			return "Schedule item already exists with similar starting hour.";
		}

		const dataToInsert = convertEditorDataToSubject(data);
		const dayIndex = weekData.findIndex(x => x.day === data.day);
		const nextSubjIndex = dayData.findIndex(
			x => (x as Subject).startHour >= dataToInsert.startHour
		);

		if (nextSubjIndex === -1) {
			weekData[dayIndex].dayData.push(dataToInsert);
		} else {
			weekData[dayIndex].dayData = insertIntoArray(
				dayData,
				nextSubjIndex,
				dataToInsert
			);
		}

		AsyncStorage.setItem(this._scheduleKey, JSON.stringify(weekData));

		return null;
	}

	async getById(id: string): Promise<SubjectWithDay | null> {
		const weekData = await this.getWeekData();

		let subject: Subject | null = null;
		let day: WeekDay = WeekDay.Friday;

		for (let i = 0; i < weekData.length; i++) {
			let avaliableItems = weekData[i].dayData.filter(
				s => (s as Subject).id === id
			);

			day = weekData[i].day;

			if (avaliableItems.length > 0) {
				subject = avaliableItems[0] as Subject;
				break;
			}
		}

		let subjectWithDay = subject ? { ...subject, day: day } : null;

		return subjectWithDay;
	}

	async getTodaysSchedule(): Promise<DataItem[]> {
		const todaysInfo = this.getTodaysInfo();

		const fullSchedule = await this.getWeekData();
		let todaysSchedule = fullSchedule.filter(
			x => x.day === todaysInfo.dayName
		);

		const processed = this.processScheduleData(todaysSchedule);

		if (processed.length === 0) {
			return [];
		}

		const processedSchedule = processed[0].dayData;

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

	private createDay(day: WeekDay, weekData: AppData): AppData {
		const weekDayArr = Object.values(WeekDay);
		const newDayIndex = weekDayArr.indexOf(day);
		let realIndex = weekData.findIndex(
			x => weekDayArr.indexOf(x.day) - 1 === newDayIndex
		);

		const dataToInsert = {
			day: day,
			dayData: [],
		};

		if (realIndex === -1) {
			weekData.push(dataToInsert);
		} else {
			weekData = insertIntoArray(weekData, realIndex, dataToInsert);
		}

		return weekData;
	}
}

export default AsyncDataProvider;
