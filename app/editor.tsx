import { Button, StyleSheet, TextInput, View } from "react-native";
import ScreenView from "@/elements/ScreenView";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Select, { SelectItem } from "@/components/editor/Select";
import { Week, WeekDay } from "@/models/scheduleTypes";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";

function Editor() {
	const navigation = useNavigation();
	const params = useLocalSearchParams();

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

	const itemTypeData = Object.keys(Week).map(x => {
		const newObject: SelectItem = {
			title: x,
			value: x,
		};

		return newObject;
	});

	const [data, setData] = useState({
		room: "",
		name: "",
		startingHour: "",
		day: null,
		weekType: null,
		subjectType: null,
	});

	useEffect(() => {
		if (Object.keys(params).length !== 0) {
			navigation.setOptions({ title: "Edit schedule item" });
			console.log(params.itemId);
		} else {
			navigation.setOptions({ title: "Add schedule item" });
		}
	}, [navigation]);

	const handleChange = (pair: { [key: string]: string }) => {
		setData(prev => {
			return { ...prev, ...pair };
		});
	};

	const onSave = () => {
		if (Object.values(data).some(x => x === null || x === "")) {
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
					placeholder='Select day'
				/>
				<Select
					style={styles.select}
					data={weekTypeData}
					onSelect={(item, index) =>
						handleChange({ weekType: item.value })
					}
					placeholder='Select week type'
				/>
				<Select
					style={styles.select}
					data={itemTypeData}
					onSelect={(item, index) =>
						handleChange({ subjectType: item.value })
					}
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
