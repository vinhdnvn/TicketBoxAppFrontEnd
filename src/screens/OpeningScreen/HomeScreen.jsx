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

// ================REDUX===================
import { useSelector, useDispatch } from "react-redux";
//  useDispatch : gọi hành động thay đổi state
//  useSelector : lấy state từ store
import { setStart } from "../../Redux/Actions/updateAction";
import { useEffect } from "react";
import { MAIN_COLOR_TEXT, SECONDARY_COLOR_TEXT } from "../../Style/styles";
import LottieView from "lottie-react-native";
import Toast from "react-native-toast-message";
import ToastSuccess from "../../Notifications/ToastSucess";
// =========================================

const HomeScreen = ({ navigation }) => {
	const loginUserData = useSelector((state) => state.personalInfor);
	const [isTokken, setIsTokken] = useState("");
	const route = useRoute();
	// create useEffect to console log loginUserData
	const user = useSelector((state) => state.personalInfor);
	const dispatch = useDispatch();
	const loggingState = useSelector((state) => state.loggingInfor);
	const showToast = () => {
		Toast.show({
			type: "success",

			text1: "Hello",
			text2: "This is some something 👋",
			visibilityTime: 2000,
			autoHide: true,
		});
	};
	const toastConfig = {
		success: (internalState) => (
			// create modal view to message login success
			<ToastSuccess />
		),
	};
	useEffect(() => {
		setTimeout(() => {
			dispatch(setStart());
		}, 1000);
	}, []);
	useEffect(() => {
		if (loggingState.isLogging) {
			showToast();
		}
	}, []);

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
									{loginUserData.token ? (
										<Image
											style={{ height: 50, width: 50, borderRadius: "100%", zIndex: 5 }}
											source={{
												uri: loginUserData.image,
											}}
										></Image>
									) : (
										<Image
											style={{ height: 50, width: 50, borderRadius: "100%", zIndex: 5 }}
											source={{
												uri: "https://img.freepik.com/free-icon/user_318-159711.jpg",
											}}
										></Image>
									)}
								</View>
							</TouchableOpacity>
						</View>
						<View>
							<Text
								style={{
									color: MAIN_COLOR_TEXT,
									marginTop: 10,
									fontWeight: "bold",
									fontSize: 25,
								}}
							>
								Hello {loginUserData.name}!
							</Text>
							<Text style={{ color: SECONDARY_COLOR_TEXT, fontSize: 16 }}>
								Book your favourite film 👋
							</Text>
						</View>
						{/* use toucopacity with finding icon  */}
						<View style={{ marginTop: 10, marginLeft: 40 }}>
							<TouchableOpacity
								onPress={() => {
									console.log(loginUserData);
								}}
							>
								<Finding
									name="magnifying-glass"
									size={45}
									style={{ borderRadius: "100%", opacity: 0.5, color: SECONDARY_COLOR_TEXT }}
								/>
							</TouchableOpacity>
						</View>
					</View>
					{/* check if route.params.token is have that show the featured screen, if not navigate back to Login */}
					{/* {route.params?.token ? <FeaturedScreen /> : navigation.navigate("Login")} */}

					<FeaturedScreen />
				</View>
			</ScrollView>
			<Toast config={toastConfig} />
		</View>
	);
};

export default HomeScreen;
const styles = StyleSheet.create({
	pageCont: {
		height: "100%",
		width: "100%",
		flex: 1,
		backgroundColor: "black",
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
