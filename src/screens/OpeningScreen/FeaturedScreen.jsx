import {
	Text,
	View,
	Image,
	TouchableOpacity,
	Dimensions,
	FlatList,
	ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import movies from "../../data/movies";
import { useState } from "react";
import { Rating } from "react-native-stock-star-rating";
import { PureComponent } from "react";

// connect backedn axios
import axios, * as others from "axios";
import { useEffect } from "react";
// const baseUrl = "http://192.168.1.47:5000";
import { baseURL } from "../../api/client/private.client";
const SRC_WIDTH = Dimensions.get("window").width;
const CARD_LENGTH = SRC_WIDTH * 0.6;
const SPACING = SRC_WIDTH * 0.05; //0.02
const SIDECARD_LENGTH = (SRC_WIDTH * 0.18) / 2;

// ===========REDUX===========
import { useDispatch, useSelector } from "react-redux";
import { MAIN_COLOR_TEXT, PRIMARY_COLOR, SECONDARY_COLOR_TEXT } from "../../Style/styles";
import React from "react";
import { set } from "date-fns";

const FeaturedScreen = React.memo(() => {
	const navigation = useNavigation();
	const DATA = movies;
	const [movie, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const loginUserData = useSelector((state) => state.personalInfor);
	const dispatch = useDispatch();

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`${baseURL}/api/movies`)
			.then((res) => {
				setMovies(res.data.movies);
				// alert("get movies success");
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
				// alert("get movies failed");
			});
	}, []);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size={"large"} color={PRIMARY_COLOR} />
			</View>
		);
	}

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
								color: SECONDARY_COLOR_TEXT,
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
					<PopularList DATA={movie} />
				</View>
			</View>
		</View>
	);
});

const PopularList = React.memo(({ DATA }) => {
	const navigation = useNavigation();
	const popular = DATA.filter((film) => film.isPopular == true);
	const route = useRoute();
	return (
		<View style={{ paddingHorizontal: 22 }}>
			{/* use render DATA which have isPopular = true  */}
			{/* <FlatList
				data={popular}
				keyExtractor={(item) => item._id}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => {
					return (
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
								<Text style={{ color: MAIN_COLOR_TEXT, fontWeight: "600" }}>{item.title}</Text>
								<View style={{ marginVertical: 5 }}>
									<Rating stars={4.7} maxStars={5} size={12} />
								</View>
								<Text style={{ color: SECONDARY_COLOR_TEXT }}>{item.types}</Text>
							</View>
						</View>
					);
				}}
			/> */}

			{popular.map((item, index) => (
				<TouchableOpacity
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
					style={{
						width: 100,
						height: 150,
						flexDirection: "row",
						alignItems: "center",
						marginVertical: 10,
						borderRadius: 10,
					}}
					key={item._id}
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
						<Text style={{ color: MAIN_COLOR_TEXT, fontWeight: "600" }}>{item.nameMovie}</Text>
						<View style={{ marginVertical: 5 }}>
							<Rating stars={item.rating} maxStars={5} size={12} />
						</View>
						<Text style={{ color: SECONDARY_COLOR_TEXT }}>{item.gerne}</Text>
					</View>
				</TouchableOpacity>
			))}
		</View>
	);
});

const MovieList = React.memo(({ DATA }) => {
	const route = useRoute();

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
								style={{
									alignItems: "flex-start",
									shadowColor: "white",
									shadowOffset: {
										width: 0,
										height: 5,
									},
									shadowOpacity: 0.34,
									shadowRadius: 6.27,

									elevation: 10,
								}}
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
											color: SECONDARY_COLOR_TEXT,
											fontSize: 15,
											marginLeft: 3,
											marginTop: 2,
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
});

export default FeaturedScreen;
