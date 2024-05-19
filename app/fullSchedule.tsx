import WeekTypeBtn from "@/components/fullSchedule/WeekTypeBtn";
import Gap from "@/components/shared/Gap";
import SubjectBox from "@/components/shared/SubjectBox";
import { Colors } from "@/constants/Colors";
import { data } from "@/data/dummyData";
import AppText from "@/elements/AppText";
import ScreenView from "@/elements/ScreenView";
import { AppData } from "@/models/listTypes";
import { Week } from "@/models/scheduleTypes";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { NativeStackNavigationOptions } from "react-native-screens/lib/typescript/native-stack/types";

function fullSchedule() {
	const weekTypes = [Week.Every, Week.Even, Week.Odd];
	const navigatation = useNavigation();

	const headerOptions: NativeStackNavigationOptions = {
		title: "Full Schedule",
		headerRight: () => (
			<WeekTypeBtn
				text={weekTypes[weekType]}
				onPress={() => onChangeWeekType()}
			/>
		),
	};

	const [weekType, setWeekType] = useState(0);
	const [subjectData, setSubjectData] = useState(data);

	const onChangeWeekType = () => {
		setWeekType(prevState => {
			if (prevState === 2) {
				return 0;
			} else {
				return ++prevState;
			}
		});
	};

	const filterItems = (data: AppData): AppData => {
		const newData: AppData = [];

		data.forEach(item => {
			const filteredItems = item.dayData.filter(x => {
				if (
					typeof x !== "number" &&
					weekTypes[weekType] !== Week.Every
				) {
					return x.week === weekTypes[weekType];
				}

				return true;
			});

			newData.push({
				day: item.day,
				dayData: filteredItems,
			});
		});

		return newData;
	};

	useEffect(() => {
		navigatation.setOptions(headerOptions);
		setSubjectData(filterItems(data));
	}, [navigatation, weekType]);

	return (
		<ScreenView>
			<ScrollView>
				<FlatList
					horizontal
					data={subjectData}
					keyExtractor={item => item.day}
					renderItem={({ item }) => {
						return (
							<View
								style={{
									marginHorizontal: 10,
								}}
							>
								<AppText style={styles.dayTitle}>
									{item.day}
								</AppText>

								<FlatList
									data={item.dayData}
									renderItem={({ item }) => {
										if (typeof item === "number") {
											return <Gap hoursGap={item} />;
										} else {
											return (
												<SubjectBox subject={item} />
											);
										}
									}}
									scrollEnabled={false}
								/>
							</View>
						);
					}}
				/>
			</ScrollView>
		</ScreenView>
	);
}

const styles = StyleSheet.create({
	dayTitle: {
		color: Colors.whiteFontColor,
		fontSize: 40,
		textTransform: "uppercase",
		marginHorizontal: 20,
		marginVertical: 40,
	},
});

export default fullSchedule;
