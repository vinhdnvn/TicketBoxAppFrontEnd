import React, { useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
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
	const route = useRoute();
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
								onPress={() =>
									navigation.navigate("Account", {
										token: route.params?.token,
										name: route.params?.name,
										image: route.params?.image,
										email: route.params?.email,
									})
								}
							>
								<View>
									<Image
										style={{ height: 50, width: 50, borderRadius: "100%" }}
										source={{
											uri: route.params?.image,
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
								Hello {route.params?.name}!
							</Text>
							<Text style={{ color: "gray", fontSize: 16 }}>Book your favourite film 👋</Text>
						</View>
						{/* use toucopacity with finding icon  */}
						<View style={{ marginTop: 10, marginLeft: 40 }}>
							<TouchableOpacity
								onPress={() => {
									console.log(route.params?.token);
								}}
							>
								<Finding
									name="magnifying-glass"
									size={45}
									style={{ borderRadius: "100%", opacity: 0.2 }}
								/>
							</TouchableOpacity>
						</View>
					</View>
					{/* check if route.params.token is have that show the featured screen, if not navigate back to Login */}
					{/* {route.params?.token ? <FeaturedScreen /> : navigation.navigate("Login")} */}

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
