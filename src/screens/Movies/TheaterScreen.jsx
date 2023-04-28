import { useNavigation, useRoute } from "@react-navigation/native";
import {
	FlatList,
	Pressable,
	Text,
	TouchableOpacity,
	View,
	Image,
	StyleSheet,
	ScrollView,
	Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useContext } from "react";
import { MovieCards } from "./Context";
import { addDays, eachDayOfInterval, eachWeekOfInterval, format, subDays } from "date-fns";
import React, { useState } from "react";
import PagerView from "react-native-pager-view";
import BackModal from "react-native-vector-icons/AntDesign";
const dates = eachWeekOfInterval(
	{
		start: subDays(new Date(), 14),
		end: addDays(new Date(), 14),
	},
	{
		weekStartsOn: 1,
	}
).reduce((acc: Date[][], cur) => {
	const allDays = eachDayOfInterval({
		start: cur,
		end: addDays(cur, 6),
	});

	acc.push(allDays);
	return acc;
}, []);

const TheaterScreen = () => {
	const route = useRoute();
	const { seats, setSeats } = useContext(MovieCards);
	const onSeatSelect = (item) => {
		const seatSelected = seats.find((seat) => seat === item);

		if (seatSelected) {
			setSeats(seats.filter((seat) => seat !== item));
		} else {
			setSeats([...seats, item]);
		}
	};

	console.log(seats, "you pressed on");

	// book ticket button
	const [isModalVisible, setModalVisible] = useState(false);

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};
	// ======

	// feee payyying
	const fee = 87;
	const noOfSeats = seats.length;
	const total = seats.length > 0 ? fee + noOfSeats * 240 : 0;
	console.log(total);
	console.log(seats, "seats selected");

	// ======for Date SLider ==========
	const [selectedDate, setSelectedDate] = useState(null);
	const handleDateSelect = (date) => {
		setSelectedDate(date);
	};
	// =========for Time Slider =========
	const [selectedTime, setSelectedTime] = useState(null);
	const handleTimeSelect = (time) => {
		setSelectedTime(time);
	};

	return (
		<View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
			<View style={{ alignItems: "center" }}>
				{/* <Text style={{ color: "white" }}> {route.params.title}</Text> */}
				<Text style={{ color: "black", fontSize: 15, fontWeight: "700" }}>{route.params.mall}</Text>
				<Text style={{ color: "gray", fontSize: 12 }}>{route.params.timeSelected}</Text>
				{/* date picker */}
				<DateSlider onDateSelect={handleDateSelect} />

				{/* ================================== */}

				<TimesSlider onTimeSelect={handleTimeSelect} />
			</View>
			{/* Seats */}
			<View style={{ marginTop: 20 }}>
				<FlatList
					contentContainerStyle={{ alignItems: "center" }}
					numColumns={6}
					data={route.params.tableSeats}
					renderItem={({ item }) => (
						<Pressable
							onPress={() => onSeatSelect(item)}
							style={{
								margin: 10,
								borderRadius: 10,
							}}
						>
							{seats.includes(item) ? (
								<Text
									style={{
										borderColor: "white",

										color: "black",
										padding: 10,
										borderRadius: 10,
										backgroundColor: "orange",
									}}
								>
									{item}
								</Text>
							) : (
								<Text
									style={{
										borderColor: "white",

										color: "black",
										padding: 10,
										borderRadius: 10,
										backgroundColor: "#BCB9B9",
									}}
								>
									{item}
								</Text>
							)}
						</Pressable>
					)}
				/>
			</View>
			{/* notation seats */}
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					marginTop: 5,
				}}
			>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<FontAwesome name="circle" size={24} color="#BCB9B9" />
					<Text style={{ color: "black", fontSize: 10, marginHorizontal: 5 }}>Available</Text>
				</View>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<FontAwesome name="circle" size={24} color="orange" />
					<Text style={{ color: "black", fontSize: 10, marginHorizontal: 5 }}>Selected</Text>
				</View>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<FontAwesome name="circle" size={24} color="black" />
					<Text style={{ color: "black", fontSize: 10, marginHorizontal: 5 }}>Reserved</Text>
				</View>
			</View>
			<View
				style={{
					width: "88%",
					alignItems: "center",
					alignSelf: "center",
					height: 100,
					marginTop: 40,
					justifyContent: "space-between",
					flexDirection: "row",
				}}
			>
				<View
					style={{
						backgroundColor: "#E0E0E0",
						borderRadius: 20,
						padding: 20,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text style={{ color: "black", fontSize: 15, fontWeight: "600" }}>
						{" "}
						{seats.length} Tickets
					</Text>
					<Text
						numberOfLines={1}
						style={{ color: "gray", fontSize: 12, textAlign: "center", width: 50 }}
					>
						{/* show the seats selected */}
						{seats.join(", ")}
					</Text>
				</View>
				{/* button book */}
				<TouchableOpacity
					onPress={toggleModal}
					style={{
						backgroundColor: "#FF1F3D",
						padding: 27,
						borderRadius: 20,
						width: 210,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>Book</Text>
				</TouchableOpacity>
				{/* Modal */}
				<View>
					<Modal
						animationType="slide"
						transparent={true}
						visible={isModalVisible}
						onRequestClose={() => {
							Alert.alert("Modal has been closed.");
							setModalVisible(!isModalVisible);
						}}
						style={{ alignItems: "center" }}
					>
						<View
							style={{
								width: "100%",
								height: "100%",
								backgroundColor: "rgba(11,11,11,0.5)",
								flexDirection: "column",
								borderRadius: 10,
							}}
						>
							<Text
								style={{ top: 52, left: 115, color: "white", fontWeight: "bold", fontSize: 22 }}
							>
								Your Booking !
							</Text>
							<TouchableOpacity
								style={{ position: "absolute", top: 50, right: 18 }}
								onPress={() => setModalVisible(!isModalVisible)}
							>
								<BackModal style={{ opacity: 0.8 }} name="closecircleo" size={30} color={"white"} />
							</TouchableOpacity>
							<View
								style={{
									top: 80,
									width: "100%",
									flexDirection: "column",
									alignItems: "center",
								}}
							>
								{/* first View */}
								<View
									style={{
										backgroundColor: "white",
										flexDirection: "row",
										marginHorizontal: 10,
										padding: 6,
										borderRadius: 20,
									}}
								>
									<Image
										source={{
											uri: route.params.imageMovies,
										}}
										style={{ width: 90, height: 115, resizeMode: "cover", borderRadius: 20 }}
									/>
									<View
										style={{
											flexDirection: "column",
											marginLeft: 15,
											justifyContent: "space-around",
										}}
									>
										{/* film ref */}
										<View>
											<Text
												numberOfLines={1}
												style={{ color: "black", fontWeight: "500", width: 230 }}
											>
												{route.params.nameMovie}
											</Text>
											<Text
												style={{ color: "black", fontWeight: "500", opacity: 0.8, marginTop: 8 }}
											>
												{route.params.genre}
											</Text>
										</View>
										{/* time date ref */}
										<View style={{}}>
											<Text style={{ color: "black", fontWeight: "500" }}>
												Cinema : {route.params.nameTheater}
											</Text>
											<Text
												style={{ color: "black", fontWeight: "500", opacity: 0.8, marginTop: 8 }}
											>
												{selectedDate}, {selectedTime}
											</Text>
										</View>
									</View>
								</View>

								{/* second view */}
								<View
									style={{
										marginTop: 20,
										backgroundColor: "white",
										marginHorizontal: 10,
										borderRadius: 20,
									}}
								>
									<View
										style={{
											padding: 5,
											marginHorizontal: 8,
											flexDirection: "column",
										}}
									>
										{/* ticket form */}
										<View
											style={{
												flexDirection: "row",
												justifyContent: "space-between",
												marginTop: 10,
											}}
										>
											<Text style={{ fontSize: 18 }}>{seats.length} Tickets</Text>
											<Text numberOfLines={1} style={{ fontSize: 18 }}>
												{seats.join(", ")}
											</Text>
										</View>
										<Text style={{ marginTop: 10 }}>
											--------------------------------------------------
										</Text>
										{/* cost form */}
										<View
											style={{
												flexDirection: "row",
												justifyContent: "space-between",
												marginTop: 10,
											}}
										>
											<Text style={{ fontSize: 18 }}>Regular Seats:</Text>
											<Text style={{ fontSize: 18 }}>(Cost) x 3</Text>
										</View>
										<Text style={{ marginTop: 10 }}>
											--------------------------------------------------
										</Text>
										{/* total cost form and fee */}
										<View
											style={{
												flexDirection: "row",
												justifyContent: "space-between",
												marginTop: 10,
											}}
										>
											<Text style={{ fontSize: 18 }}>Service Fee:</Text>
											<Text style={{ fontSize: 18 }}>$1.20</Text>
										</View>
										<Text style={{ marginTop: 10 }}>
											--------------------------------------------------
										</Text>
										{/* payment part */}
										<View
											style={{
												flexDirection: "column",
												justifyContent: "space-between",
												marginTop: 10,
											}}
										>
											<View style={{ flexDirection: "row" }}>
												<Text style={{ fontSize: 18, fontWeight: "600" }}>Payment Method:</Text>
											</View>
											{/* first method */}
											<View
												style={{
													flexDirection: "row",
													marginTop: 10,
													backgroundColor: "#ECEBEB",
													borderRadius: 20,
													padding: 10,
													alignItems: "center",
												}}
											>
												<Image
													source={{
														uri: "https://imageio.forbes.com/blogs-images/steveolenski/files/2016/07/Mastercard_new_logo-1200x865.jpg?format=jpg&width=960",
													}}
													style={{ width: 50, height: 50 }}
												/>
												<View
													style={{
														flexDirection: "column",
														justifyContent: "space-between",
														marginLeft: 20,
													}}
												>
													<Text style={{ fontSize: 15, fontWeight: "500" }}>MasterCard</Text>
													<Text>**** **** **** 0222</Text>
												</View>
											</View>
											{/* second method */}
											<View
												style={{
													flexDirection: "row",
													marginTop: 10,
													backgroundColor: "#ECEBEB",
													borderRadius: 20,
													padding: 10,
													alignItems: "center",
												}}
											>
												<Image
													source={{
														uri: "https://imageio.forbes.com/blogs-images/steveolenski/files/2016/07/Mastercard_new_logo-1200x865.jpg?format=jpg&width=960",
													}}
													style={{ width: 50, height: 50 }}
												/>
												<View
													style={{
														flexDirection: "column",
														justifyContent: "space-between",
														marginLeft: 20,
													}}
												>
													<Text style={{ fontSize: 15, fontWeight: "500" }}>MasterCard</Text>
													<Text>**** **** **** 0222</Text>
												</View>
											</View>
											{/* third method */}
											<View
												style={{
													flexDirection: "row",
													marginTop: 10,
													backgroundColor: "#ECEBEB",
													borderRadius: 20,
													padding: 10,
													alignItems: "center",
												}}
											>
												<Image
													source={{
														uri: "https://imageio.forbes.com/blogs-images/steveolenski/files/2016/07/Mastercard_new_logo-1200x865.jpg?format=jpg&width=960",
													}}
													style={{ width: 50, height: 50 }}
												/>
												<View
													style={{
														flexDirection: "column",
														justifyContent: "space-between",
														marginLeft: 20,
													}}
												>
													<Text style={{ fontSize: 15, fontWeight: "500" }}>MasterCard</Text>
													<Text>**** **** **** 0222</Text>
												</View>
											</View>
										</View>
										{/* button */}
										<TouchableOpacity
											style={{
												width: 300,
												height: 50,
												backgroundColor: "gray",
												alignSelf: "center",
												borderRadius: 20,
												marginVertical: 10,
											}}
										>
											<Text
												style={{ alignSelf: "center", marginTop: 10, fontSize: 20, color: "white" }}
											>
												Confirm
											</Text>
										</TouchableOpacity>
									</View>
								</View>

								{/* <Text>{route.params.nameMovie}</Text>
								<Text>{route.params.nameTheater}</Text>
								<Text>{seats.join(" ")}</Text>
								<Text>{seats.length}</Text>
								<Text>{selectedDate}</Text>
								<Text>{selectedTime}</Text> */}
							</View>
						</View>
					</Modal>
				</View>
			</View>
		</View>
	);
};

const DateSlider = (props) => {
	const { onDateSelect } = props;

	return (
		<PagerView
			pageMargin={10}
			style={{
				width: "100%",
				height: 80,
				marginTop: 10,
			}}
		>
			{dates.map((week, i) => {
				return (
					<View key={i}>
						<View style={{ flexDirection: "row", justifyContent: "space-around" }}>
							{week.map((day, index) => {
								const [isPressed, setIsPressed] = useState(false);

								const handlePress = () => {
									setIsPressed(!isPressed);
									const selectedDate = day.toLocaleDateString("en-GB");
									console.log(selectedDate);
									onDateSelect(selectedDate);
								};
								const buttonColor = isPressed ? "#E43838" : "#E8DFDF";
								const txtColor = isPressed ? "white" : "black";
								const txt = format(day, "EEE");
								return (
									<TouchableOpacity
										onPress={handlePress}
										style={{
											alignItems: "center",
											backgroundColor: buttonColor,
											borderRadius: 10,
											width: 40,
											height: 70,
											justifyContent: "center",
										}}
										key={index}
									>
										<View style={{ alignItems: "center" }}>
											<Text style={{ fontSize: 10, marginBottom: 5, color: txtColor }}>{txt}</Text>
											<Text style={{ fontSize: 20, fontWeight: "500", color: txtColor }}>
												{day.getDate()}
											</Text>
										</View>
									</TouchableOpacity>
								);
							})}
						</View>
					</View>
				);
			})}
		</PagerView>
	);
};

const timeOptions = [
	"4:00 AM",
	"5:00 AM",
	"7:00 AM",
	"8:00 AM",
	"9:00 AM",
	"10:00 AM",
	"12:00 PM",
	"1:00 PM",
	"2:00 PM",
	"3:00 PM",

	"5:00 PM",
	"6:00 PM",
	"8:00 PM",
	"9:00 PM",
	"10:00 PM",
	"11:00 PM",
];
const TimesSlider = (props) => {
	const [selectedTime, setSelectedTime] = useState("");
	const { onTimeSelect } = props;

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.timePickerContainer}>
				<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
					{timeOptions.map((time) => (
						<TouchableOpacity
							key={time}
							onPress={() => {
								setSelectedTime(time);
								// log the time after the user selects it
								console.log(time);
								onTimeSelect(time);
							}}
							style={[styles.timeOption, time === selectedTime && styles.selectedTimeOption]}
						>
							<Text style={styles.timeOptionText}>{time}</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</TouchableOpacity>
			{/* <Text style={styles.selectedTime}>{selectedTime}</Text> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		marginTop: 10,
	},
	timePickerContainer: {
		height: 80,
	},
	timeOption: {
		padding: 8,
		marginRight: 20,
		borderRadius: 20,
		backgroundColor: "#F5F5F5",
		alignItems: "center",
		justifyContent: "center",
	},
	selectedTimeOption: {
		backgroundColor: "#007AFF",
	},
	timeOptionText: {
		color: "#333333",
		fontSize: 16,
	},
	selectedTime: {
		marginTop: 20,
		fontSize: 24,
		fontWeight: "bold",
	},
});

export default TheaterScreen;
