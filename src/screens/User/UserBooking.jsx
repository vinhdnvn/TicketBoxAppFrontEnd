import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Modal } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { baseURL } from "../../api/client/private.client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserBooking = React.memo(() => {
	const userState = useSelector((state) => state.personalInfor);
	// console.log(userState);
	const [bookingList, setBookingList] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);

	const handdleToggleModal = () => {
		setModalVisible(!modalVisible);
	};

	useEffect(() => {
		const getBookingList = async () => {
			await axios
				.get(`${baseURL}/api/bookings/${userState._id}`)
				.then((res) => {
					// console.log(res.data);
					setBookingList(res.data);
					// console.log(bookingList);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		getBookingList();
	}, []);
	const navigation = useNavigation();
	return (
		<View style={{ width: "100%", height: "100%" }}>
			{/* create arrow back icon for back the previous navigation */}
			<View
				style={{
					position: "absolute",
					top: 45,
					left: 20,
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<Icon
					name="arrow-back"
					size={30}
					color="black"
					onPress={() => {
						navigation.goBack();
					}}
				/>
				<Text style={{ fontSize: 20, marginLeft: 90 }}>Your ticket</Text>
			</View>
			{/* create a view contain the tickets by Flatlist */}
			<View style={{ marginTop: 150 }}>
				<FlatList
					horizontal
					data={bookingList}
					keyExtractor={(item) => item._id}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								onPress={() => {
									console.log(item.movie);
									// handdleToggleModal();
								}}
								style={{
									justifyContent: "center",
									alignItems: "center",
									marginHorizontal: 20,
								}}
								key={item._id}
							>
								<Image
									style={{
										width: 250,
										height: 440,
										borderRadius: 40,
									}}
									source={{ uri: item.imageBooking }}
								/>

								<View
									style={{
										justifyContent: "center",
										alignItems: "center",
										flexDirection: "column",
										backgroundColor: "#EBE9E9",
										borderRadius: 20,
										width: 250,
										height: 120,
									}}
								>
									<View style={{ flexDirection: "row" }}>
										<View style={{ flexDirection: "row" }}>
											<Text style={{ fontSize: 15, fontWeight: "bold" }}>Date:</Text>
											<Text style={{ fontSize: 15 }}> {item.date}</Text>
										</View>
										<View style={{ flexDirection: "row", marginLeft: 10 }}>
											<Text style={{ fontSize: 15, fontWeight: "bold" }}>Time:</Text>
											<Text style={{ fontSize: 15 }}> {item.time}</Text>
										</View>
									</View>
									<View style={{ flexDirection: "row" }}>
										<View style={{ flexDirection: "row" }}>
											<Text style={{ fontSize: 15, fontWeight: "bold" }}>Name:</Text>
											<Text numberOfLines={1} style={{ fontSize: 15, width: 90 }}>
												{" "}
												{item.movie}
											</Text>
										</View>
										<View
											style={{
												flexDirection: "row",
												marginLeft: 10,
											}}
										>
											<Text style={{ fontSize: 15, fontWeight: "bold" }}>Seats:</Text>
											<Text style={{ fontSize: 15 }}> {item.seat}</Text>
										</View>
									</View>
									<Image
										style={{ width: 240, height: 50, borderRadius: 30, marginTop: 5 }}
										source={require("../../data/serial2.png")}
									/>
								</View>
							</TouchableOpacity>
						);
					}}
				/>
			</View>
		</View>
	);
});

export default UserBooking;
