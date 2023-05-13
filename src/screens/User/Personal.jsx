import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../../api/client/private.client";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const getUserData = async () => {
	try {
		const token = await AsyncStorage.getItem("token");
		const res = await axios.get(`${baseURL}/api/users`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const userData = res.data;
		console.log(userData.name, userData.email, userData.image);
	} catch (error) {
		console.log(error);
	}
};

const Personal = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const [userName, setUserName] = useState("");

	// create function to handle logout clear all ìnformation of user
	const handleLogout = async () => {
		//    print the item token stored in async storage
		console.log(await AsyncStorage.getItem("token"));
		await AsyncStorage.removeItem("token");
		navigation.navigate("Login");
	};
	useEffect(() => {
		const getItemFromAsyncStorage = async () => {
			try {
				const name = await AsyncStorage.getItem("name");
				if (name !== null) {
					setUserName(name);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getItemFromAsyncStorage();
	}, []);

	return (
		<View
			style={{
				width: "100%",
				height: "100%",
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<ScrollView>
				<View
					style={{
						backgroundColor: "#ffffff",
						marginTop: 15,
						borderRadius: 8,
						width: 350,
					}}
				>
					<View>
						<View
							style={{
								flexDirection: "row",
								padding: 15,
								alignItems: "center",
							}}
						>
							{/* avatar */}
							<View style={{}}>
								<Image
									style={{ height: 80, width: 80, borderRadius: "100%" }}
									source={{
										uri: "https://blog.logrocket.com/wp-content/uploads/2020/11/create-avatar-feature-react.png",
									}}
								/>
							</View>
							{/* name and edit butotn */}
							<View style={{ marginLeft: 15 }}>
								<Text style={{ fontWeight: "bold", fontSize: 16 }}>{userName}</Text>
								<View
									style={{
										marginTop: 10,
										borderWidth: 1,
										borderRadius: 5,
										borderColor: "#990099",
										alignItems: "center",
										width: 120,
									}}
								>
									<Text style={{ padding: 2, color: "#990099", fontWeight: "bold" }}>
										Your profile
									</Text>
								</View>
							</View>
						</View>
						{/* own tickets */}
						<View
							style={{
								padding: 20,
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Icon3 name="ticket-confirmation-outline" size={25} color={"#990099"} />
							<Text style={{ marginLeft: 18, fontWeight: "500" }}>My tickets</Text>
						</View>
					</View>
				</View>
				{/* ============ */}
				<View
					style={{
						backgroundColor: "#ffffff",
						marginTop: 15,
						borderRadius: 8,
						width: 350,
						paddingRight: 15,
						paddingVertical: 10,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Image
							style={{ width: 150, height: 150 }}
							source={{
								uri: "https://play-lh.googleusercontent.com/9s-9zONYk4NZvLlHVMIF5cGCzrx7PjZYQ3uow5P8Rj2Mt_XHWygV3gOt75_iI1YtTg",
							}}
						/>
						<View style={{ flexShrink: 1 }}>
							<View>
								<Text style={{ fontSize: 15, fontWeight: "500" }}>
									Follow TicketBox to get the latest updates
								</Text>
							</View>
							<View
								style={{
									borderWidth: 1,
									alignItems: "center",
									marginTop: 5,
									borderRadius: 5,
									padding: 4,
									borderColor: "#4267B2",
									backgroundColor: "#4267B2",
								}}
							>
								<Text style={{ color: "#fafafa", fontWeight: "500" }}>Open Facebook</Text>
							</View>
						</View>
					</View>
				</View>
				{/* ========= */}
				<View
					style={{
						backgroundColor: "#ffffff",
						marginTop: 15,
						borderRadius: 8,
						width: 350,
						paddingRight: 15,
						paddingVertical: 10,
					}}
				>
					<View style={{ flexDirection: "column" }}>
						<Text style={{ marginLeft: 15, fontWeight: "bold" }}>Setting</Text>
					</View>
				</View>
				{/* =========== */}
				<View
					style={{
						backgroundColor: "#ffffff",
						marginTop: 15,
						borderRadius: 8,
						width: 350,
						paddingRight: 15,
						paddingVertical: 10,
					}}
				>
					<View style={{ flexDirection: "column" }}>
						<Text style={{ marginLeft: 15, fontWeight: "bold" }}>Support</Text>
						<View style={{ marginLeft: 15, marginTop: 10 }}>
							<TouchableOpacity>
								<View
									style={{
										borderBottomWidth: 1,
										paddingVertical: 5,
										borderBottomColor: "#C3BDBD",
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<Icon2 name="trash-2" color={"gray"} size={25} />
									<Text style={{ marginLeft: 10 }}>Delete Account</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity onPress={handleLogout}>
								<View
									style={{
										borderBottomWidth: 1,
										paddingVertical: 5,
										borderBottomColor: "#C3BDBD",
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<Icon style={{ marginLeft: 3 }} name="exit-outline" color={"gray"} size={25} />
									<Text style={{ marginLeft: 10 }}>Log out</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				{/* =========== */}
				<View
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						marginTop: 10,
					}}
				>
					<Text style={{ color: "gray" }}> Version 1.0.0</Text>
				</View>
			</ScrollView>
		</View>
	);
};

export default Personal;
