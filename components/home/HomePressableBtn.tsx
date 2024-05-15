import { ReactNode } from "react";
import {
	GestureResponderEvent,
	Pressable,
	StyleProp,
	ViewStyle,
} from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

interface HomePressableBtn {
	children: ReactNode;
	onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
	style?: StyleProp<ViewStyle>;
}

function HomePressableBtn({ children, onPress, style }: HomePressableBtn) {
	const scale = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => {
		const val = withTiming(scale.value, {
			duration: 100,
			easing: Easing.bezier(0.5, 0.01, 0, 1),
		});

		return {
			transform: [{ scale: val }],
		};
	});

	return (
		<Pressable
			onPressIn={() => {
				scale.value = 0.95;
			}}
			onPressOut={() => {
				scale.value = 1;
			}}
			onPress={onPress}
		>
			<Animated.View style={[animatedStyle, style]}>
				{children}
			</Animated.View>
		</Pressable>
	);
}

export default HomePressableBtn;
