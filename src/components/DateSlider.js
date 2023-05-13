import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image, TextInput, Dimensions } from "react-native";

import cinema from "../data/cinema";
import { useEffect } from "react";
import { FlatList } from "react-native";
import axios, * as others from "axios";
const baseUrl = "http://192.168.1.47:5000";

import { useNavigation } from "@react-navigation/native";
import { Rating } from "react-native-stock-star-rating";

// import { firebase } from "../../firebase.js";

import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native";

// import { ref } from "firebase/storage";
// import { storage } from "../../firebase";

const SRC_WIDTH = Dimensions.get("window").width;
const CARD_LENGTH = SRC_WIDTH * 0.6;
const SPACING = SRC_WIDTH * 0.05; //0.02
const SIDECARD_LENGTH = (SRC_WIDTH * 0.18) / 2;

const DateSlider = () => {
	const navigation = useNavigation();

	const [image, setImage] = useState(null);
	const [uploading, setUploading] = useState(false);

	const handleChooseImage = async () => {
		let result = await DocumentPicker.getDocumentAsync({});

		setImageMovies(result.uri);
	};
	const handleChooseTrailer = async () => {
		let result = await DocumentPicker.getDocumentAsync({});

		setVideoTrailer(result.uri);
	};

	return (
		<View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
			{/* View to handle login with button Login */}
			<View
				style={{
					marginTop: 20,
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text style={{ fontWeight: "500" }}> You need Login to foward this tab ! </Text>
				{/* create button navigate to login  */}
				<TouchableOpacity
					style={{
						marginTop: 30,
						borderRadius: 5,
						width: 150,
						height: 50,
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "blue",
					}}
					onPress={() => navigation.navigate("Login")}
				>
					<Text>Go to Login</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default DateSlider;
