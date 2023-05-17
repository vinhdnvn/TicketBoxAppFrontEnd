import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Image,
	FlatList,
	Dimensions,
} from "react-native";
// import { Modal } from "react-native";
import { useState } from "react";
// import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
// import CarouselSlider from "../../components/CarouselSlider";
import movies from "../../data/movies";
import { baseURL } from "../../api/client/private.client";
import { useEffect } from "react";
import axios from "axios";
import { MAIN_COLOR_TEXT } from "../../Style/styles";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setCinema } from "../../Redux/Actions/cinemaAction";
import HandleLogged from "../../components/HandleLogged";
import React from "react";
const CinemaPicker = React.memo(() => {
	const dispatch = useDispatch();
	const stateCinema = useSelector((state) => state.cinemaInfor);

	const route = useRoute();
	const [selectedDate, setSelectedDate] = useState("");
	const [mall, setMall] = useState([]);
	const [seatsData, setSeatsData] = useState([]);
	// const cinemasData = cinema;
	const navigation = useNavigation();
	const movie = movies;
	const [cinemaData, setCinemaData] = useState([]);

	// new
	const [scrolX, setScrolX] = useState(0);

	const SRC_WIDTH = Dimensions.get("window").width;
	const CARD_LENGTH = SRC_WIDTH * 0.6;
	const SPACING = SRC_WIDTH * 0.05; //0.02
	const SIDECARD_LENGTH = (SRC_WIDTH * 0.18) / 2;

	// useEffect(() => {
	// 	const checkIfLoggedIn = async () => {
	// 		const token = await AsyncStorage.getItem("token");
	// 		if (token) {
	// 			navigation.navigate("Login");
	// 		}
	// 	};
	// 	checkIfLoggedIn();
	// }, []);

	useEffect(() => {
		axios
			.get(`${baseURL}/api/cinemas`)
			.then((res) => {
				setCinemaData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const loginUserData = useSelector((state) => state.personalInfor);

	return (
		<View
			style={{
				width: "100%",
				height: "100%",
				flexDirection: "column",
				backgroundColor: "#151515",
			}}
		>
			{loginUserData.token ? (
				<FlatList
					contentContainerStyle={{ marginTop: "35%", justifyContent: "center" }}
					data={cinemaData.cinemas}
					horizontal
					keyExtractor={(item) => item._id}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => (
						<View style={{ alignItems: "center" }}>
							<TouchableOpacity
								onPress={() => {
									console.log(item.name);
									// console.log(item.tableData)
									setMall(item.name);
									setSeatsData(item.tableData);
									dispatch(setCinema(item._id));

									navigation.navigate("Theater", {
										nameMovie: route.params.nameMovie,
										tableSeats: item.tableData,
										image: route.params.image,
										nameTheater: item.name,
										gerne: route.params.gerne,
										arraySeats: item.seats,
									});
								}}
								style={{ justifyContent: "center", alignItems: "center" }}
							>
								<View
									scrolX={scrolX}
									style={{
										width: 200,
										height: 300,
										overflow: "hidden",
										marginLeft: Number == 0 ? SIDECARD_LENGTH : SPACING,
										marginRight: Number == 2 ? SIDECARD_LENGTH : SPACING,
										borderRadius: 20,
									}}
								>
									<View style={{ alignItems: "center" }}>
										<Image
											style={{
												width: "100%",
												height: "100%",
												resizeMode: "contain",
												backgroundColor: "black",
											}}
											source={{ uri: item.cinemaImage }}
										/>
									</View>
								</View>
								<Text
									style={{ fontSize: 18, fontWeight: "500", marginTop: 20, color: MAIN_COLOR_TEXT }}
								>
									{item.name}
								</Text>
							</TouchableOpacity>
						</View>
					)}
				></FlatList>
			) : (
				<HandleLogged />
			)}
		</View>
	);
});

const styles = StyleSheet.create({});

export default CinemaPicker;
