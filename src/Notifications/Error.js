import { View } from "react-native/types";

export const InlineError = ({ text }) => {
	return (
		<View>
			<Text style={{ color: "red" }}>{text}</Text>
		</View>
	);
};
