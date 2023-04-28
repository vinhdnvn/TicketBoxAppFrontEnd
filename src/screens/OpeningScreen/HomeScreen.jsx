import React, { useRef, useState } from "react";
import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
	Dimensions,
} from "react-native";
// import { Carousel } from "react-native-reanimated-carousel";
import FeaturedScreen from "./FeaturedScreen";
// import findding icon
import Finding from "react-native-vector-icons/Entypo";

const HomeScreen = ({ navigation }) => {
	return (
		<View style={styles.pageCont}>
			{/* Header */}

			{/* Content */}
			<ScrollView style={{ marginTop: -10 }} showsVerticalScrollIndicator={false}>
				<View>
					<View style={styles.navigateCont}>
						<View>
							<TouchableOpacity
								style={{ marginTop: 10, marginLeft: -10, marginRight: 10 }}
								onPress={() => navigation.navigate("Account")}
							>
								<View>
									<Image
										style={{ height: 50, width: 50, borderRadius: "100%" }}
										source={{
											uri: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
										}}
									></Image>
								</View>
							</TouchableOpacity>
						</View>
						<View>
							<Text
								style={{
									color: "black",
									marginTop: 10,
									fontWeight: "bold",
									fontSize: 25,
								}}
							>
								Hello Vinh !
							</Text>
							<Text style={{ color: "gray", fontSize: 16 }}>Book your favourite film 👋</Text>
						</View>
						{/* use toucopacity with finding icon  */}
						<View style={{ marginTop: 10, marginLeft: 40 }}>
							<TouchableOpacity>
								<Finding
									name="magnifying-glass"
									size={45}
									style={{ borderRadius: "100%", opacity: 0.2 }}
								/>
							</TouchableOpacity>
						</View>
					</View>

					<FeaturedScreen />
				</View>
			</ScrollView>
		</View>
	);
};

export default HomeScreen;
const styles = StyleSheet.create({
	pageCont: {
		height: "100%",
		width: "100%",
		flex: 1,
		backgroundColor: "white",
	},

	text: {
		color: "red",
	},
	text: {
		fontSize: 18,
		fontWeight: "800",
	},
	headerCont: {
		marginTop: 20,
		width: "100%",
	},
	titleCont: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginLeft: "2.5%",
		marginRight: "2.5%",
	},
	navigateCont: {
		width: "100%",
		flexDirection: "row",
		// justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
		marginTop: 40,
	},
	touch: {
		paddingVertical: 20,
		paddingHorizontal: 70,
	},
});
