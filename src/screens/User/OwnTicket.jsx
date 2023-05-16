import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Video } from "expo-av";
import BellIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Heart from "react-native-vector-icons/AntDesign";
// import play icon
import PlayButton from "react-native-vector-icons/Entypo";
import { PRIMARY_COLOR } from "../../Style/styles";

const OwnTicket = () => {
	const video = React.useRef(null);
	const [liked, setLiked] = useState(false);
	const handleLike = () => {
		setLiked(!liked);
	};
	const [status, setStatus] = useState({});
	const navigation = useNavigation();
	const mario = require("../../data/film/mario.mp4");
	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					position: "absolute",
					zIndex: 1,
					flexDirection: "row",
					justifyContent: "space-between",
					paddingHorizontal: 10,
					width: "100%",
					top: 50,
				}}
			>
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
				<TouchableOpacity
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
					<BellIcon name="search" size={20} color={"#rgba(255,255,255,0.8)"} />
				</TouchableOpacity>
				{/* play button */}
			</View>
			{/* play button */}
			<TouchableOpacity
				onPress={() => {
					status.isPlaying ? video.current.pauseAsync() : video.current.playAsync();
				}}
				style={{
					backgroundColor: "#rgba(0,0,0,0.5)",
					borderRadius: 100,
					opacity: 1,
					width: 55,
					height: 55,
					zIndex: 1,
					alignItems: "center",
					justifyContent: "center",
					top: 320,
					left: 165,
				}}
			>
				<PlayButton
					style={{ opacity: 0.3 }}
					// if video play then icon will change to pause icon "controller-paus"
					name={status.isPlaying ? "controller-paus" : "controller-play"}
					size={32}
					color={"#rgba(255,255,255,0.8)"}
				/>
			</TouchableOpacity>

			<Video
				ref={video}
				style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
				source={mario}
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
					flexDirection: "column",
					width: "100%",
					bottom: 10,
				}}
			>
				<View style={{ marginLeft: 12, marginBottom: 15 }}>
					{/* Trailerrrrrrrrrr tab */}
					<View
						style={{
							backgroundColor: "#rgba(0,0,0,0.6)",
							width: 50,
							height: 30,
							alignItems: "center",
							justifyContent: "center",
							borderRadius: 10,
						}}
					>
						<Text style={{ color: "white", fontSize: 10 }}>Trailer</Text>
					</View>
					{/* ==================== */}
					{/* Content text  */}
					<Text style={{ color: "white", fontSize: 22, width: 250 }}>
						THE SUPER MARIO BROS. MOVIES
					</Text>
					<Text
						style={{
							color: "white",
							width: 250,
							fontWeight: "300",
							fontSize: 13,
							marginBottom: 5,
						}}
					>
						A plumber name Mario travis through you arew suck myu dickjd who sdk iosajdiosaj asiojd
						ios iosd jfoisddsof oi weioj
					</Text>
					{/* ==================== */}
				</View>

				<View style={{ flexDirection: "row" }}>
					<View
						style={{
							backgroundColor: "#rgba(0,0,0,0.5)",
							width: 250,

							flexDirection: "row",
							justifyContent: "space-between",
							paddingHorizontal: 8,
							paddingVertical: 15,
							borderRadius: 20,
						}}
					>
						<View style={{ backgroundColor: "gray", borderRadius: 10, padding: 5 }}>
							<Text style={{ color: "white", fontSize: 12 }}>Advanture</Text>
						</View>
						<View style={{ backgroundColor: "gray", borderRadius: 10, padding: 5 }}>
							<Text style={{ color: "white", fontSize: 12 }}>Comedy</Text>
						</View>
						<View style={{ backgroundColor: "gray", borderRadius: 10, padding: 5 }}>
							<Text style={{ color: "white", fontSize: 12 }}>Animation</Text>
						</View>
					</View>
					<TouchableOpacity
						onPress={() => {
							status.isPlaying ? video.current.pauseAsync() : video.current.playAsync();
							navigation.navigate("Home");
						}}
						style={{
							backgroundColor: PRIMARY_COLOR,
							alignItems: "center",
							justifyContent: "center",
							width: 100,
							borderRadius: 15,
							marginLeft: 15,
							flexDirection: "row",
						}}
					>
						<Text style={{ color: "white", fontSize: 12 }}>See more </Text>
						<BellIcon name="arrow-right" size={18} color={"#rgba(255,255,255,0.8)"} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default OwnTicket;
