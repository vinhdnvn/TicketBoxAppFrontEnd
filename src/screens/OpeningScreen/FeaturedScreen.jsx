import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	Dimensions,
	FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import movies from "../../data/movies";
import { useState } from "react";
import { Rating } from "react-native-stock-star-rating";
import cinema from "../../data/cinema";

// connect backedn axios
import axios, * as others from "axios";
import { useEffect } from "react";
const baseUrl = "http://172.20.10.13:5000";

const SRC_WIDTH = Dimensions.get("window").width;
const CARD_LENGTH = SRC_WIDTH * 0.6;
const SPACING = SRC_WIDTH * 0.05; //0.02
const SIDECARD_LENGTH = (SRC_WIDTH * 0.18) / 2;

const FeaturedScreen = () => {
	const navigation = useNavigation();
	const DATA = movies;
	const popular = DATA.filter((film) => film.popular == true);
	const [movie, setMovies] = useState([]);
	useEffect(() => {
		axios
			.get(`${baseUrl}/movies`)
			.then((res) => {
				// console.log(res.data);
				setMovies(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<View style={{ width: "100%", height: "100%" }}>
			<View style={{ marginHorizontal: 15 }}></View>
			<View>
				<MovieList DATA={movies}></MovieList>
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
	// new
	const [movies, setMovies] = useState([]);
	useEffect(() => {
		const config = {
			method: "get",
			url: `${baseUrl}/movies`,
			headers: {},
		};
		axios(config)
			.then((res) => {
				if (res.status === 200) {
					setMovies(res.data);
				} else {
					alert("failed");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const navigation = useNavigation();
	const [scrollX, setScrollX] = useState(0);
	// ====================

	const theater = cinema;

	return (
		<View style={{ marginTop: 2 }}>
			<FlatList
				data={movies}
				horizontal
				keyExtractor={(item) => item._id}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<View key={item._id} style={{ alignItems: "center" }}>
						<TouchableOpacity
							style={{ alignItems: "flex-start" }}
							key={item._id}
							onPress={() =>
								navigation.navigate("Movie Detail", {
									movieId: item._id,
									description: item.description,
									nameMovie: item.nameMovie,
									rating: item.rating,
									rottenTomatoes: item.rottenTomatoes,
									ign: item.ign,
									genre: item.genre,
									imageMovies: item.imageMovies,
								})
							}
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
											uri: item.imageMovies,
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
				)}
				onScroll={(event) => {
					setScrollX(event.nativeEvent.contentOffset.x);
				}}
			/>
		</View>
	);
};

export default FeaturedScreen;
