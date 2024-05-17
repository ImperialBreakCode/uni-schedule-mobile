import { Colors } from "@/constants/Colors";
import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

function ScreenView({ children }: { children: ReactNode }) {
	return <View style={styles.screenView}>{children}</View>;
}

const styles = StyleSheet.create({
	screenView: {
		backgroundColor: Colors.viewBackgroundColor,
		flex: 1,
		flexDirection: "column",
	},
});

export default ScreenView;
