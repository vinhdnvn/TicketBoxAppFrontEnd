import React, { useState } from "react";
import { Text, TouchableOpacity, View, ScrollView, TextInput, Dimensions } from "react-native";

import cinema from "../data/cinema";
import { useEffect } from "react";
import { FlatList } from "react-native";
import axios, * as others from "axios";
const baseUrl = "http://192.168.1.4:5000";

import { useNavigation } from "@react-navigation/native";
import { Rating } from "react-native-stock-star-rating";

const SRC_WIDTH = Dimensions.get("window").width;
const CARD_LENGTH = SRC_WIDTH * 0.6;
const SPACING = SRC_WIDTH * 0.05; //0.02
const SIDECARD_LENGTH = (SRC_WIDTH * 0.18) / 2;

const DateSlider = () => {
	const [movies, setMovies] = useState([]);
	useEffect(() => {
		const config = {
			method: "get",
			url: `${baseUrl}/movies`,
			headers: {},
		};
		axios(config)
			.then(function (response) {
				if (response.status === 200) {
					setMovies(response.data);
					alert("Login success");
				} else {
					alert("Login failed");
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	// console.log("REnder from thisssssssssssssssssss =====================================");
	// console.log(movies.forEach((element) => console.log(element.image)));

	const navigation = useNavigation();
	const popular = movies.filter((film) => film.popular == true);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");

	const [scrollX, setScrollX] = useState(0);
	return (
		<View style={{ width: "100%", height: "100%" }}>
			{/* create form input test to insert new movies  */}
		</View>
	);
};

export default DateSlider;
