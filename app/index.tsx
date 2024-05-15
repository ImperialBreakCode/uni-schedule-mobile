import HomePressableBtn from "@/components/home/HomePressableBtn";
import SecondaryHomeBtn from "@/components/home/SecondaryHomeBtn";
import TodaysScheduleBtn from "@/components/home/TodaysScheduleBtn";
import { Feather } from "@expo/vector-icons";
import { Feather as Calendar } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import AppText from "@/elements/AppText";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

function Home() {
	const navigation = useNavigation();
	const router = useRouter();

	useEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, [navigation]);

	return (
		<View style={homeStyles.view}>
			<StatusBar barStyle={"light-content"} />

			<AppText style={homeStyles.h1}>University Schedule</AppText>

			<View
				style={{
					marginVertical: 50,
				}}
			>
				<HomePressableBtn onPress={() => router.push("/today")}>
					<TodaysScheduleBtn />
				</HomePressableBtn>

				<View style={homeStyles.secondaryButtons}>
					<View style={{ flex: 1 }}>
						<SecondaryHomeBtn
							icon={
								<Feather
									name='edit-2'
									size={24}
									color='black'
								/>
							}
						>
							Edit Schdule
						</SecondaryHomeBtn>
					</View>

					<View style={{ flex: 1 }}>
						<SecondaryHomeBtn
							icon={
								<Calendar
									name='calendar'
									size={24}
									color='black'
								/>
							}
						>
							View Full Schedule
						</SecondaryHomeBtn>
					</View>
				</View>
			</View>
		</View>
	);
}

const homeStyles = StyleSheet.create({
	view: {
		backgroundColor: Colors.viewBackgroundColor,
		flex: 1,
		flexDirection: "column",
		paddingVertical: 100,
	},
	h1: {
		fontSize: 50,
		color: Colors.whiteFontColor,
		paddingHorizontal: 10,
	},
	secondaryButtons: {
		flexDirection: "row",
		paddingVertical: 20,
		paddingHorizontal: 5,
		justifyContent: "center",
	},
});

export default Home;
