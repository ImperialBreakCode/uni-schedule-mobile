import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import AppText from "@/elements/AppText";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export type SelectItem = {
	title: string;
	value: any;
};

interface SelectProps {
	data: SelectItem[];
	onSelect: (selectedItem: any, index: number) => void;
	placeholder: string;
	style?: StyleProp<ViewStyle>;
	defaultValueByIndex?: number | undefined;
}

function Select({ placeholder, style, ...rest }: SelectProps) {
	return (
		<View style={style}>
			<SelectDropdown
				{...rest}
				dropdownStyle={{
					backgroundColor: "#2b2b2b",
					borderRadius: 10,
				}}
				renderButton={(selectedItem, isOpen) => {
					return (
						<View style={styles.button}>
							<AppText style={styles.buttonText}>
								{(selectedItem && selectedItem.title) ||
									placeholder}
							</AppText>
							<AntDesign
								name={isOpen ? "up" : "down"}
								size={24}
								color='white'
							/>
						</View>
					);
				}}
				renderItem={(selectedItem, index, isSelected) => {
					return (
						<View style={styles.item}>
							<AppText
								style={[
									styles.itemText,
									isSelected
										? { backgroundColor: "#0c3a91" }
										: {},
								]}
							>
								{selectedItem.title}
							</AppText>
						</View>
					);
				}}
			/>
		</View>
	);
}

export default Select;

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#2b2b2b",
		padding: 15,
		borderRadius: 10,
	},
	buttonText: {
		color: Colors.whiteFontColor,
		fontSize: 15,
	},
	itemText: {
		backgroundColor: "#2b2b2b",
		color: Colors.whiteFontColor,
		padding: 15,
	},
	item: {
		margin: 0,
	},
});
