import { View, Text } from "react-native";

const ToastSuccess = () => {
	return (
		<View
			style={{
				width: "80%",
				paddingHorizontal: 10,
				paddingVertical: 10,
				borderLeftWidth: 10,
				borderLeftColor: "green",
				backgroundColor: "#E1E1E1",
				borderRadius: 8,
				height: 50,
				justifyContent: "center",
				alignItems: "flex-start",
				zIndex: 100,
				position: "absolute",
			}}
		>
			<Text style={{ color: "black", fontSize: 12, fontWeight: "500" }}>
				Booking Succes ! Please check your ticket
			</Text>
		</View>
	);
};

export default ToastSuccess;
