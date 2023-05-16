import React, { useRef, useEffect } from "react";
import { Button, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Toast from "react-native-toast-message";
import ToastSuccess from "../Notifications/ToastSucess";

export default function DateSlider() {
	const toastConfig = {
		success: (internalState) => (
			// create modal view to message login success
			<ToastSuccess />
		),
	};
	const showToast = () => {
		Toast.show({
			type: "success",

			text1: "Hello",
			text2: "This is some something 👋",
			visibilityTime: 3000,
			autoHide: true,
		});
	};

	return (
		<View style={{ width: "100%", height: "100%" }}>
			<TouchableOpacity style={{ top: 500, left: 200 }} onPress={showToast}>
				<Text>Show Toast</Text>
			</TouchableOpacity>

			<Toast config={toastConfig} />
			{/* create TouchableOpacity to showToast */}
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
