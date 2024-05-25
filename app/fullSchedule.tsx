import WeekTypeBtn from "@/components/fullSchedule/WeekTypeBtn";
import Gap from "@/components/shared/Gap";
import SubjectBox from "@/components/shared/SubjectBox";
import { Colors } from "@/constants/Colors";
import AppText from "@/elements/AppText";
import ScreenView from "@/elements/ScreenView";
import { AppData } from "@/models/listTypes";
import { Week } from "@/models/scheduleTypes";
import { useNavigation } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
	FlatList,
	ScrollView,
	StyleSheet,
	View,
	useWindowDimensions,
} from "react-native";
import { DataContext } from "./_layout";

function FullSchedule() {
	const weekTypes = [Week.Even, Week.Odd];
	const navigatation = useNavigation();
	const dataProvider = useContext(DataContext);

	const width = useWindowDimensions().width;
	const dayViewWidth = width * 0.8;
	const dayViewSpacing = 10;

	const [weekType, setWeekType] = useState(0);
	const [unfilteredData, setUnfilteredData] = useState<AppData>([]);
	const [subjectData, setSubjectData] = useState<AppData>([]);

	const onChangeWeekType = () => {
		setWeekType(prevState => Math.abs(prevState - 1));
	};

	const filterItems = (data: AppData): AppData => {
		const newData: AppData = [];

		data.forEach(item => {
			const filteredItems = item.dayData.filter(x => {
				if (typeof x !== "number") {
					return (
						x.week === weekTypes[weekType] || x.week === Week.Every
					);
				}

				return true;
			});

			if (typeof filteredItems[0] === "number") {
				filteredItems.shift();
			}
			if (typeof filteredItems[filteredItems.length - 1] === "number") {
				filteredItems.pop();
			}

			newData.push({
				day: item.day,
				dayData: filteredItems,
			});
		});

		return newData;
	};

	useEffect(() => {
		async function initData() {
			const data = await dataProvider.getProcessedWeekData();
			setUnfilteredData(data);
			setSubjectData(filterItems(data));
		}

		initData();
	}, []);

	useEffect(() => {
		navigatation.setOptions({
			title: "Full Schedule",
			headerRight: () => (
				<WeekTypeBtn
					text={weekTypes[weekType]}
					onPress={() => onChangeWeekType()}
				/>
			),
		});

		setSubjectData(filterItems(unfilteredData));
	}, [navigatation, weekType]);

	return (
		<ScreenView>
			<ScrollView>
				<FlatList
					horizontal
					data={subjectData}
					keyExtractor={item => item.day.toString()}
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					snapToInterval={dayViewWidth + dayViewSpacing}
					snapToAlignment='center'
					decelerationRate='fast'
					renderItem={({ item }) => {
						return (
							<View
								style={{
									marginHorizontal: dayViewSpacing / 2,
									width: dayViewWidth,
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

export default FullSchedule;
