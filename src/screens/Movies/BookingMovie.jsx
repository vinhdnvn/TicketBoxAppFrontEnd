import { useRoute } from "@react-navigation/native";
import {
	Modal,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	Image,
	FlatList,
	useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Heart from "react-native-vector-icons/AntDesign";
import { Video } from "expo-av";
import React from "react";
import Back from "react-native-vector-icons/AntDesign";
import cinema from "../../data/cinema";
import PlayButton from "react-native-vector-icons/AntDesign";
// import base url from backend
import axios, * as others from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const baseUrl = "http://192.168.1.12:5000";

const BookingMovie = () => {
	const video = React.useRef(null);
	const navigation = useNavigation();
	const route = useRoute();
	// const videoPath = route.params.video.replace(/\\/g, "//");
	const [liked, setLiked] = useState(false);
	const mario = require("D://MobileProject//src//data//film//dr_strange2.mp4");

	const handleLike = () => {
		setLiked(!liked);
	};

	const [modalVisible, setModalVisible] = useState(false);
	const openModal = () => {
		setModalVisible(true);
	};
	const closeModal = () => {
		setModalVisible(false);
	};

	const [videoTrailer, setVideoTrailer] = useState("");

	const [status, setStatus] = useState({});

	const checkIfLoggedIn = async () => {
		try {
			const token = await AsyncStorage.getItem("token");
			if (!token) {
				navigation.navigate("Login");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<Video
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
					onPress={handleLike}
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
					<PlayButton name="playcircleo" size={50} color="white" />
				</TouchableOpacity>
			</View>

			<View
				style={{
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
					backgroundColor: "white",
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
							<Text style={{ fontWeight: "700", fontSize: 15 }}>{route.params.rating}</Text>
							<Text style={{ fontSize: 15, color: "gray" }}>/10</Text>
						</View>
						<Text style={{ color: "gray", fontWeight: "400" }}>IMDb</Text>
					</View>
					<View
						style={{
							marginHorizontal: 20,
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text style={{ fontWeight: "700", fontSize: 15 }}>{route.params.rottenTomatoes}%</Text>
						<Text style={{ color: "gray", fontWeight: "400" }}>Rotten Tomatoes</Text>
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
							<Text style={{ fontWeight: "700", fontSize: 15 }}>{route.params.ign}</Text>
							<Text style={{ fontSize: 15, color: "gray" }}>/10</Text>
						</View>
						<Text style={{ color: "gray", fontWeight: "400" }}>IGN</Text>
					</View>
				</View>
				{/* Title and gern film */}
				<View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
					<Text style={{ fontSize: 20, fontWeight: "600" }}>{route.params.nameMovie}</Text>
					<View style={{ borderWidth: 0.5, marginTop: 5, padding: 2, borderRadius: 5 }}>
						<Text style={{ color: "gray", fontSize: 15 }}>{route.params.gerne}</Text>
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
					<Text style={{ fontSize: 15 }} numberOfLines={5}>
						{route.params.description}
					</Text>
				</View>
				{/* Read more description BUtton and add the event click to open modal */}
				<TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }}>
					<Text style={{ color: "orange", fontWeight: "bold", fontSize: 15 }}>Read more</Text>
				</TouchableOpacity>
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
									genre: route.params.genre,
								});
								video.current.pauseAsync();
								console.log(token);
							}

							// checking token in async storage

							// if (route.params.token) {
							// 	navigation.navigate("Please choose 1 cinema !", {
							// 		nameMovie: route.params.nameMovie,
							// 		image: route.params.image,
							// 		genre: route.params.genre,
							// 	});
							// 	video.current.pauseAsync();
							// } else {
							// 	navigation.navigate("Login");
							// 	video.current.pauseAsync();
							// }
						}}
					>
						<View style={{ backgroundColor: "orange", padding: 20, borderRadius: 30 }}>
							<Text
								style={{
									color: "black",
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

const TheaterCinema = () => {
	return (
		<View style={{ flex: 1, backgroundColor: "#000" }}>
			<FlatList
				data={data}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => {
					<Image source={{ uri: item.image }}></Image>;
				}}
			></FlatList>
		</View>
	);
};

export default BookingMovie;
