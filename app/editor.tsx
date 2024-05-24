import { StyleSheet, TextInput, View } from "react-native";
import ScreenView from "@/elements/ScreenView";
import { useNavigation } from "expo-router";
import AppText from "@/elements/AppText";
import Select, { SelectItem } from "@/components/editor/Select";
import { Week, WeekDay } from "@/models/scheduleTypes";
import { Colors } from "@/constants/Colors";

function Editor() {
	const navigation = useNavigation();

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

	return (
		<ScreenView>
			<View style={styles.formView}>
				<TextInput
					style={styles.textInput}
					placeholder='Room'
					placeholderTextColor={Colors.darkerWhiteFontColor}
				/>
				<TextInput
					style={styles.textInput}
					placeholder='Subject name'
					placeholderTextColor={Colors.darkerWhiteFontColor}
				/>
				<TextInput
					style={styles.textInput}
					placeholder='Starting hour'
					placeholderTextColor={Colors.darkerWhiteFontColor}
				/>
				<Select
					style={{ marginBottom: 10 }}
					data={daysSelectData}
					onSelect={(item, index) => console.log(item)}
					placeholder='Select day'
				/>
				<Select
					style={{ marginBottom: 10 }}
					data={weekTypeData}
					onSelect={(item, index) => console.log(item)}
					placeholder='Select week type'
				/>
				<Select
					style={{ marginBottom: 10 }}
					data={itemTypeData}
					onSelect={(item, index) => console.log(item)}
					placeholder='Select subject type'
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
		borderColor: "#5d609e",
		borderWidth: 2,
		borderRadius: 5,
	},
});
