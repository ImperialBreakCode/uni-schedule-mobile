import { Button, StyleSheet, TextInput, View } from "react-native";
import ScreenView from "@/elements/ScreenView";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Select, { SelectItem } from "@/components/editor/Select";
import {
	EditorData,
	ScheduleItemType,
	Week,
	WeekDay,
} from "@/models/scheduleTypes";
import { Colors } from "@/constants/Colors";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "./_layout";

function Editor() {
	const navigation = useNavigation();
	const params = useLocalSearchParams();
	const dataContext = useContext(DataContext);

	const daysSelectData = Object.keys(WeekDay).map(x => {
		const newObject: SelectItem = {
			title: x,
			value: x,
		};

		return newObject;
	});

	const weekTypeData = Object.keys(Week).map(x => {
		const newObject: SelectItem = {
			title: x + " week",
			value: x,
		};

		return newObject;
	});

	const itemTypeData = Object.keys(ScheduleItemType).map(x => {
		const newObject: SelectItem = {
			title: x,
			value: x,
		};

		return newObject;
	});

	const getEnumIndex = (
		enumType: object,
		value: string | null
	): number | undefined => {
		if (value) {
			return Object.values(enumType).indexOf(value);
		}
	};

	const [data, setData] = useState<EditorData>({
		id: null,
		room: "",
		name: "",
		startingHour: "",
		day: null,
		weekType: null,
		subjectType: null,
	});

	useEffect(() => {
		async function initEditData() {
			const item = await dataContext.getById(params.itemId as string);

			if (item) {
				setData({
					id: item.id,
					room: item.room.toString(),
					name: item.name,
					startingHour: item.startHour.toString(),
					day: item.day,
					weekType: item.week,
					subjectType: item.type,
				});
			}
		}

		if (Object.keys(params).length !== 0) {
			initEditData();
		}
	}, []);

	useEffect(() => {
		if (Object.keys(params).length !== 0) {
			navigation.setOptions({ title: "Edit schedule item" });
		} else {
			navigation.setOptions({ title: "Add schedule item" });
		}
	}, [navigation]);

	const handleChange = (pair: { [key: string]: string }) => {
		setData(prev => {
			return { ...prev, ...pair };
		});
	};

	const onSave = async () => {
		if (
			Object.entries(data).some(
				x => (x[1] === null || x[1] === "") && x[0] != "id"
			)
		) {
			alert("All fields are required");
			return;
		}

		if (
			!(
				Number(data.startingHour) &&
				Number(data.startingHour) <= 23 &&
				Number(data.startingHour) >= 0
			)
		) {
			alert("The starting hour should be a number between 0 and 23");
			return;
		}

		if (Object.keys(params).length === 0) {
			const error = await dataContext.saveData(data);

			if (error) {
				alert(error);
			} else {
				navigation.goBack();
			}
		}
	};

	return (
		<ScreenView>
			<View style={styles.formView}>
				<TextInput
					style={styles.textInput}
					placeholder='Room'
					placeholderTextColor={Colors.darkerWhiteFontColor}
					onChangeText={text => handleChange({ room: text })}
					value={data.room}
				/>
				<TextInput
					style={styles.textInput}
					placeholder='Subject name'
					placeholderTextColor={Colors.darkerWhiteFontColor}
					onChangeText={text => handleChange({ name: text })}
					value={data.name}
				/>
				<TextInput
					style={styles.textInput}
					placeholder='Starting hour'
					placeholderTextColor={Colors.darkerWhiteFontColor}
					onChangeText={text => handleChange({ startingHour: text })}
					value={data.startingHour}
				/>
				<Select
					style={styles.select}
					data={daysSelectData}
					onSelect={(item, index) =>
						handleChange({ day: item.value })
					}
					defaultValueByIndex={getEnumIndex(WeekDay, data.day)}
					placeholder='Select day'
				/>
				<Select
					style={styles.select}
					data={weekTypeData}
					onSelect={(item, index) =>
						handleChange({ weekType: item.value })
					}
					defaultValueByIndex={getEnumIndex(Week, data.weekType)}
					placeholder='Select week type'
				/>
				<Select
					style={styles.select}
					data={itemTypeData}
					onSelect={(item, index) =>
						handleChange({ subjectType: item.value })
					}
					defaultValueByIndex={getEnumIndex(
						ScheduleItemType,
						data.subjectType
					)}
					placeholder='Select subject type'
				/>

				<Button
					onPress={onSave}
					title='Save'
				/>
			</View>
		</ScreenView>
	);
}

export default Editor;

const styles = StyleSheet.create({
	formView: { paddingHorizontal: 20 },
	textInput: {
		padding: 10,
		marginBottom: 10,
		color: Colors.whiteFontColor,
		fontSize: 13,
		borderColor: "#3e75b8",
		borderWidth: 2,
		borderRadius: 5,
	},
	select: {
		marginBottom: 10,
	},
	button: {},
});
