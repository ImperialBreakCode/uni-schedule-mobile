import TodaysScheduleBtn from "@/components/home/TodaysScheduleBtn";
import { Colors } from "@/constants/Colors";
import AppText from "@/elements/AppText";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

function Home() {
	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, []);

	return (
		<View style={homeStyles.view}>
			<StatusBar barStyle={"light-content"} />
			<AppText style={homeStyles.h1}>University Schedule</AppText>

			<View style={homeStyles.buttonsWrapper}>
				<TodaysScheduleBtn />
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
	buttonsWrapper: {
		marginVertical: 50,
	},
});

export default Home;
