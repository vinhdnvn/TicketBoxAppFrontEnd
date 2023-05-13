import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	Dimensions,
	FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import movies from "../../data/movies";
import { useState } from "react";
import { Rating } from "react-native-stock-star-rating";

// connect backedn axios
import axios, * as others from "axios";
import { useEffect } from "react";
// const baseUrl = "http://192.168.1.47:5000";
import { baseURL } from "../../api/client/private.client";
const SRC_WIDTH = Dimensions.get("window").width;
const CARD_LENGTH = SRC_WIDTH * 0.6;
const SPACING = SRC_WIDTH * 0.05; //0.02
const SIDECARD_LENGTH = (SRC_WIDTH * 0.18) / 2;

const FeaturedScreen = () => {
	const navigation = useNavigation();
	const DATA = movies;
	const popular = DATA.filter((film) => film.popular == true);
	const [movie, setMovies] = useState([]);
	const [videoTrailer, setVideoTrailer] = useState("");
	const route = useRoute();
	useEffect(() => {
		axios
			.get(`${baseURL}/api/movies`)
			.then((res) => {
				setMovies(res.data.movies);
				// alert("success");
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<View style={{ width: "100%", height: "100%" }}>
			<View style={{ marginHorizontal: 15 }}></View>
			<View>
				<MovieList DATA={movie}></MovieList>
			</View>
			{/* list popular */}
			<View
				style={{
					flexDirection: "column",
				}}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						paddingHorizontal: 22,
					}}
				>
					<View>
						<Text
							style={{
								color: "black",
								marginTop: 10,
								fontWeight: "bold",
								fontSize: 20,
							}}
						>
							Popular
						</Text>
					</View>
					<View>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("FavouriteMovies");
							}}
						>
							<Text
								style={{
									color: "gray",
									marginTop: 10,
									fontWeight: "bold",
									fontSize: 20,
								}}
							>
								Favourite
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View>
					<PopularList DATA={DATA} />
				</View>
			</View>
		</View>
	);
};

const PopularList = ({ DATA }) => {
	const navigation = useNavigation();
	const popular = DATA.filter((film) => film.popular == true);
	return (
		<View style={{ paddingHorizontal: 22 }}>
			{popular.map((item) => (
				<View
					style={{
						width: 100,
						height: 150,
						flexDirection: "row",
						alignItems: "center",
						marginVertical: 10,
						borderRadius: 10,
					}}
					key={item.id}
				>
					<Image
						source={{ uri: item.image }}
						style={{
							width: "100%",
							height: "100%",
							resizeMode: "contain",
							borderRadius: 10,
						}}
					/>
					<View style={{ marginLeft: 20, width: 230 }}>
						<Text style={{ color: "black", fontWeight: "600" }}>{item.title}</Text>
						<View style={{ marginVertical: 5 }}>
							<Rating stars={4.7} maxStars={5} size={12} />
						</View>
						<Text style={{ color: "gray" }}>{item.types}</Text>
					</View>
				</View>
			))}
		</View>
	);
};

const MovieList = ({ DATA }) => {
	const route = useRoute();
	// new
	// const [movies, setMovies] = useState([]);
	// useEffect(() => {
	// 	const config = {
	// 		method: "get",
	// 		url: `${baseUrl}/api/movies`,
	// 		headers: {},
	// 	};
	// 	axios(config)
	// 		.then((res) => {
	// 			if (res.status === 200) {
	// 				setMovies(res.data);
	// 				console.log(movies);
	// 			} else {
	// 				alert("failed");
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, []);
	const navigation = useNavigation();
	const [scrollX, setScrollX] = useState(0);
	// ====================

	return (
		<View style={{ marginTop: 2 }}>
			<FlatList
				data={DATA}
				horizontal
				keyExtractor={(item) => item._id}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => {
					return (
						<View key={item._id} style={{ alignItems: "center" }}>
							<TouchableOpacity
								style={{ alignItems: "flex-start" }}
								key={item._id}
								onPress={() => {
									navigation.navigate("Movie Detail", {
										movieId: item._id,
										description: item.description,
										nameMovie: item.nameMovie,
										rating: item.rating,
										rottenTomatoes: item.rottenTomatoes,
										ign: item.ign,
										gerne: item.gerne,
										image: item.image,
										video: item.video,
										token: route.params?.token,
										userId: route.params?.userId,
										userName: route.params?.userName,
									});
								}}
							>
								<View
									scrollX={scrollX}
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
												aspectRatio: 4 / 3,
												height: "100%",
												resizeMode: "contain",
											}}
											source={{
												uri: item.image,
											}}
										/>
									</View>
								</View>

								<View
									style={{
										marginLeft: 20,
										marginTop: 10,
									}}
								>
									<Text
										numberOfLines={1}
										style={{
											width: 200,
											color: "gray",
											fontSize: 15,
											marginLeft: 3,
										}}
									>
										{item.nameMovie}
									</Text>
									<Rating stars={item.stars} maxStars={5} size={16} />
								</View>
							</TouchableOpacity>
						</View>
					);
				}}
				onScroll={(event) => {
					setScrollX(event.nativeEvent.contentOffset.x);
				}}
			/>
		</View>
	);
};

export default FeaturedScreen;
