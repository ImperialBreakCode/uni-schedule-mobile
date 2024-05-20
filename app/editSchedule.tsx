import AddItemBtn from "@/components/editSchedule/AddItemBtn";
import Collapsable from "@/components/editSchedule/Collapsable";
import RemoveSelectionBtn from "@/components/editSchedule/RemoveSelectionBtn";
import RightHeaderButtons from "@/components/editSchedule/RightHeaderButtons";
import SubjectBox from "@/components/shared/SubjectBox";
import { Colors } from "@/constants/Colors";
import { forEdit } from "@/data/dummyData";
import ScreenView from "@/elements/ScreenView";
import { Subject } from "@/models/scheduleTypes";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	FlatList,
	Pressable,
	ScrollView,
	TouchableWithoutFeedback,
} from "react-native";
import { NativeStackNavigationOptions } from "react-native-screens/lib/typescript/native-stack/types";

function editSchedule() {
	const navigation = useNavigation();

	const [selectedItemId, setSelectedItemId] = useState<string | null>();

	const headerOptions: NativeStackNavigationOptions = {
		title: "Edit Schedule",
		headerRight: () => <AddItemBtn />,
		headerLeft: undefined,
		headerStyle: {
			backgroundColor: Colors.viewBackgroundColor,
		},
	};

	const headerSelectionOptions: NativeStackNavigationOptions = {
		title: "Selected Item",
		headerRight: () => <RightHeaderButtons />,
		headerLeft: () => <RemoveSelectionBtn onPress={removeSelection} />,
		headerStyle: {
			backgroundColor: "#5e5e5e",
		},
	};

	const selectItem = (id: string) => {
		setSelectedItemId(id);
	};

	const removeSelection = () => {
		if (selectedItemId) {
			setSelectedItemId(null);
		}
	};

	useEffect(() => {
		if (selectedItemId) {
			navigation.setOptions(headerSelectionOptions);
		} else {
			navigation.setOptions(headerOptions);
		}
	}, [navigation, selectedItemId]);

	return (
		<ScreenView>
			<TouchableWithoutFeedback onPress={removeSelection}>
				<ScrollView>
					<FlatList
						scrollEnabled={false}
						style={{
							marginTop: 30,
						}}
						data={forEdit}
						keyExtractor={item => item.day}
						renderItem={({ item }) => {
							return (
								<Collapsable title={item.day}>
									<FlatList
										data={item.dayData}
										keyExtractor={item =>
											(item as Subject).id
										}
										renderItem={({ item }) => {
											const subject = item as Subject;

											return (
												<Pressable
													onLongPress={() =>
														selectItem(subject.id)
													}
													onPress={removeSelection}
												>
													<SubjectBox
														selected={
															(selectedItemId &&
																subject.id ===
																	selectedItemId) as boolean
														}
														subject={subject}
														showWeek
													/>
												</Pressable>
											);
										}}
									/>
								</Collapsable>
							);
						}}
					/>
				</ScrollView>
			</TouchableWithoutFeedback>
		</ScreenView>
	);
}

export default editSchedule;
