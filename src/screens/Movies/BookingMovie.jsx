import { useRoute } from "@react-navigation/native";
import {
	Modal,
	FlatList,
	Text,
	TouchableOpacity,
	View,
	Image,
	ActivityIndicator,
	TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Heart from "react-native-vector-icons/AntDesign";
import { Video } from "expo-av";
import React from "react";
import Back from "react-native-vector-icons/AntDesign";
import Submit from "react-native-vector-icons/AntDesign";
import cinema from "../../data/cinema";
import PlayButton from "react-native-vector-icons/Entypo";
// import base url from backend
import axios, * as others from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MAIN_COLOR_TEXT, PRIMARY_COLOR, SECONDARY_COLOR_TEXT } from "../../Style/styles";

import { useDispatch, useSelector } from "react-redux";

import { Icon } from "react-native-elements";
import { baseURL } from "../../api/client/private.client";
import { set } from "date-fns";

const BookingMovie = () => {
	const video = React.useRef(null);
	const navigation = useNavigation();
	const route = useRoute();
	const [isLoading, setIsLoading] = useState(false);
	const [reviewData, setReviewData] = useState([]);
	const userState = useSelector((state) => state.personalInfor);
	// const videoPath = route.params.video.replace(/\\/g, "//");
	const [liked, setLiked] = useState(false);
	const handleLike = async () => {
		setLiked(!liked);
	};
	const [comment, setComment] = useState("");

	const addComment = async () => {
		axios
			.post(`${baseURL}/api/movies/${route.params.movieId}/reviews`, {
				userId: userState._id,
				comment: comment,
				image: userState.image,
				name: userState.name,
			})
			.then((res) => {
				// console.log(res.data.movies);
				setReviewData(res.data.movies);
				// console.log(reviewData);
				// console.log(reviewData);
				alert("add comment success");
			})
			.catch((err) => {
				console.log(err);
				alert("add comment failed");
			});
	};
	// get all reviews
	useEffect(() => {
		// log id of the movies
		// console.log(route.params.movieId);
		// console.log(userState._id);
		setIsLoading(true);

		axios
			.get(`${baseURL}/api/movies/${route.params.movieId}/reviews`)
			.then((res) => {
				// console.log(res.data.movies);
				setReviewData(res.data.movies);
				// console.log(reviewData);
				// alert("get reviews success");
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				alert("get reviews failed");
				setIsLoading(false);
			});
	}, []);

	const [modalVisible, setModalVisible] = useState(false);
	const openModal = () => {
		setModalVisible(true);
	};
	const closeModal = () => {
		setModalVisible(false);
	};

	const [status, setStatus] = useState({});

	const onChangeComment = (comment) => {
		setComment(comment);
	};
	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size={"large"} color={PRIMARY_COLOR} />
			</View>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			{/* {isLoading && (
				<ActivityIndicator
					size="large"
					style={{ position: "absolute", top: 0, bottom: "45%", left: 0, right: 0, zIndex: 1 }}
				/>
			)} */}
			<Video
				onLoad={() => setIsLoading(false)}
				ref={video}
				style={{
					position: "absolute",
					top: 0,
					bottom: "45%",
					left: 0,
					right: 0,
					zIndex: 1,
				}}
				source={{
					uri: route.params.video,
				}}
				// useNativeControls
				resizeMode="cover"
				isLooping
				shouldPlay={true}
				onPlaybackStatusUpdate={(status) => setStatus(() => status)}
			/>

			<View
				style={{
					position: "absolute",
					zIndex: 1,
					flexDirection: "row",
					justifyContent: "space-between",
					paddingHorizontal: 18,
					width: "100%",
					top: 50,
				}}
			>
				{/* back button */}
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={{
						backgroundColor: "#rgba(0,0,0,0.5)",
						borderRadius: 100,
						opacity: 1,
						width: 45,
						height: 45,
						zIndex: 1,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Back name="arrowleft" size={20} color="#rgba(205,255,255,0.8)" />
				</TouchableOpacity>
				{/* like button */}
				<TouchableOpacity
					onPress={() => handleLike()}
					style={{
						backgroundColor: "#rgba(0,0,0,0.5)",
						borderRadius: 100,
						opacity: 1,
						width: 45,
						height: 45,
						zIndex: 1,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{liked ? (
						<Heart name="heart" size={20} color="red" />
					) : (
						<Heart name="hearto" size={20} color="#rgba(205,255,255,0.8)" />
					)}
					{/* <BellIcon name="heart" size={20} color={"#rgba(205,255,255,0.8)"} /> */}
				</TouchableOpacity>
			</View>

			{/* play button */}
			<View style={{ position: "absolute", zIndex: 1, top: 180, left: 160 }}>
				<TouchableOpacity
					onPress={() =>
						status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
					}
					style={{ opacity: 0.1 }}
				>
					<PlayButton
						name={status.isPlaying ? "controller-paus" : "controller-play"}
						size={50}
						color="white"
					/>
				</TouchableOpacity>
			</View>

			<View
				style={{
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
					backgroundColor: "#151515",
					zIndex: 2,
					top: "50%",
					bottom: 0,
					left: 0,
					right: 0,
					width: "100%",
					height: "100%",
				}}
			>
				{/* rating and point */}
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						marginTop: 15,
					}}
				>
					<View
						style={{
							marginHorizontal: 20,
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
							<Text style={{ fontWeight: "700", fontSize: 15, color: "white" }}>
								{route.params.rating}
							</Text>
							<Text style={{ fontSize: 15, color: SECONDARY_COLOR_TEXT }}>/10</Text>
						</View>
						<Text style={{ color: SECONDARY_COLOR_TEXT, fontWeight: "400" }}>IMDb</Text>
					</View>
					<View
						style={{
							marginHorizontal: 20,
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text style={{ fontWeight: "700", fontSize: 15, color: "white" }}>
							{route.params.rottenTomatoes}%
						</Text>
						<Text style={{ color: SECONDARY_COLOR_TEXT, fontWeight: "400" }}>Rotten Tomatoes</Text>
					</View>
					<View
						style={{
							marginHorizontal: 20,
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
							<Text style={{ fontWeight: "700", fontSize: 15, color: "white" }}>
								{route.params.ign}
							</Text>
							<Text style={{ fontSize: 15, color: SECONDARY_COLOR_TEXT }}>/10</Text>
						</View>
						<Text style={{ color: SECONDARY_COLOR_TEXT, fontWeight: "400" }}>IGN</Text>
					</View>
				</View>
				{/* Title and gern film */}
				<View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
					<Text style={{ fontSize: 20, fontWeight: "600", color: PRIMARY_COLOR }}>
						{route.params.nameMovie}
					</Text>
					<View
						style={{
							borderWidth: 0.5,
							marginTop: 5,
							padding: 2,
							borderRadius: 5,
							borderColor: "white",
						}}
					>
						<Text style={{ color: SECONDARY_COLOR_TEXT, fontSize: 15 }}>{route.params.gerne}</Text>
					</View>
				</View>
				{/* Description */}
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						paddingHorizontal: 30,
						paddingTop: 30,
					}}
				>
					<Text style={{ fontSize: 15, color: SECONDARY_COLOR_TEXT }} numberOfLines={5}>
						{route.params.description}
					</Text>
				</View>
				{/* Read more description BUtton and add the event click to open modal */}
				<TouchableOpacity
					onPress={() => openModal()}
					style={{ justifyContent: "center", alignItems: "center" }}
				>
					<Text style={{ color: PRIMARY_COLOR, fontWeight: "bold", fontSize: 15 }}>Comment</Text>
				</TouchableOpacity>
				<View>
					<Modal animationType="fade" transparent={true} visible={modalVisible}>
						<View
							style={{
								width: "100%",
								height: "100%",
								backgroundColor: "rgba(11,11,11,0.5)",
								flexDirection: "column",
								borderRadius: 10,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<TouchableOpacity
								style={{
									position: "absolute",
									top: 60,
									left: 20,
									padding: 10,
									borderRadius: 50,
									borderColor: "white",
									borderWidth: 1,
								}}
								onPress={() => closeModal()}
							>
								{/* icon X */}
								<Icon name="close" size={20} color="white" />
							</TouchableOpacity>
							{/* create view for a list of review of movies */}
							<View
								style={{
									width: "90%",
									height: "90%",
									borderRadius: 10,
									padding: 10,
									top: 60,
									alignItems: "center",
								}}
							>
								{/* create a view for a list of review of movies */}
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<Text style={{ fontSize: 20, fontWeight: "bold", color: PRIMARY_COLOR }}>
										{route.params.nameMovie}
									</Text>
								</View>

								<TextInput
									style={{
										position: "absolute",
										top: 50,
										borderColor: "black",
										borderRadius: 20,
										backgroundColor: "white",
										marginTop: 20,
										width: 320,
										height: 60,
										zIndex: 20,
									}}
									placeholderTextColor="black"
									onChangeText={onChangeComment}
									placeholder="    Add a comment ... "
								/>
								{/* add a add button */}
								<TouchableOpacity
									style={{
										position: "absolute",
										top: 50,
										right: 20,
										borderColor: "black",
										borderRadius: 20,
										backgroundColor: "white",
										marginTop: 20,
										width: 60,
										height: 60,
										zIndex: 20,
										justifyContent: "center",
										alignItems: "center",
									}}
									onPress={addComment}
								>
									<Submit name="checkcircle" size={30} color="black" />
								</TouchableOpacity>

								<FlatList
									style={{ marginTop: 100 }}
									data={reviewData}
									keyExtractor={(item) => item._id}
									renderItem={(item) => {
										return (
											<TouchableOpacity
												// onPress={() => {
												// 	console.log(item.item.comment);
												// }}
												key={item._id}
												style={{
													marginTop: 20,
													backgroundColor: "white",
													width: 300,
													height: 100,
													borderRadius: 30,
												}}
											>
												<View
													style={{
														flexDirection: "row",
														alignItems: "center",
														marginLeft: 20,
													}}
												>
													<Image
														style={{ marginLeft: 10, width: 40, height: 40, borderRadius: 20 }}
														source={{ uri: item.item.image }}
													/>
													<View
														style={{
															backgroundColor: "white",
															borderRadius: 20,
															padding: 12,
															marginLeft: 10,
															marginTop: 15,
															width: 200,
														}}
													>
														<Text style={{ color: "black", fontSize: 15, fontWeight: "600" }}>
															{item.item.name}
														</Text>
														<Text
															numberOfLines={1}
															style={{ color: "black", fontSize: 12, marginTop: 20, width: 180 }}
														>
															{item.item.comment}
														</Text>
													</View>
												</View>
											</TouchableOpacity>
										);
									}}
								/>
							</View>
						</View>
					</Modal>
				</View>

				{/* button Booking */}
				<View style={{ justifyContent: "center", alignItems: "center", bottom: -50 }}>
					<TouchableOpacity
						onPress={() => {
							const token = AsyncStorage.getItem("token");
							if (!token) {
								navigation.navigate("Login");
								video.current.pauseAsync();
							} else {
								navigation.navigate("Please choose 1 cinema !", {
									nameMovie: route.params.nameMovie,
									image: route.params.image,
									gerne: route.params.gerne,
								});
								video.current.pauseAsync();
								// console.log(token);
							}
						}}
					>
						<View style={{ backgroundColor: PRIMARY_COLOR, padding: 20, borderRadius: 30 }}>
							<Text
								style={{
									color: MAIN_COLOR_TEXT,
									fontWeight: "bold",
									paddingHorizontal: 30,
								}}
							>
								Get reservation
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default BookingMovie;
