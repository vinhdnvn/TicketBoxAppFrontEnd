import React, { useRef, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

export default function DateSlider() {
	const showToast = () => {
		Toast.show({
			type: "success",
			position: "top",
			text1: "Hello",
			text2: "This is some something 👋",
			visibilityTime: 3000,
			autoHide: true,
			topOffset: 30,
			bottomOffset: 40,
			style: {
				backgroundColor: "#4CAF50",
				borderRadius: 8,
				padding: 16,
			},
			text1Style: {
				fontSize: 30,
				fontWeight: "bold",
			},
			text2Style: {
				fontSize: 16,
				color: "white",
			},
		});
	};

	return (
		<View style={styles.animationContainer}>
			{/* create TouchableOpacity to showToast */}
			<Button title="Show Toast" onPress={showToast} />
			<Toast />
		</View>
	);
}

const styles = StyleSheet.create({
	animationContainer: {
		position: "absolute",
		width: 600,
		height: 600,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonContainer: {
		paddingTop: 20,
	},
});
