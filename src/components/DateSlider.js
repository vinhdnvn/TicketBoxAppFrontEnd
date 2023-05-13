import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image, TextInput, Dimensions } from "react-native";
import cinema from "../data/cinema";
import { useEffect } from "react";
import { FlatList } from "react-native";
import axios, * as others from "axios";
import { useNavigation } from "@react-navigation/native";
import { Rating } from "react-native-stock-star-rating";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native";
// ================REDUX===================
import { useSelector, useDispatch } from "react-redux";
//  useDispatch : gọi hành động thay đổi state
//  useSelector : lấy state từ store
import { updateSetUser } from "../Redux/Actions/updateAction";
// =========================================

const SRC_WIDTH = Dimensions.get("window").width;
const CARD_LENGTH = SRC_WIDTH * 0.6;
const SPACING = SRC_WIDTH * 0.05; //0.02
const SIDECARD_LENGTH = (SRC_WIDTH * 0.18) / 2;

const DateSlider = () => {
	const [email, onChangeEmail] = useState("");

	const dispatch = useDispatch();
	useEffect(() => {
		// console.log("INFOR", infor);
	}, []);
	return (
		<View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
			{/* 		
			<View
				style={{
					marginTop: 20,
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text style={{ fontWeight: "500" }}> You need Login to foward this tab ! </Text>
			
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
			</View> */}
			<Text>Email:</Text>
			<Text>Image:</Text>
			<Text>isAdmin:</Text>
			<Text>Name:</Text>
			<TextInput
				style={{ height: 40, width: 300, marginTop: 50, borderWidth: 1 }}
				onChangeText={onChangeEmail}
				value={email}
			></TextInput>
			<TouchableOpacity
				onPress={() => {
					dispatch(updateSetUser(email));
				}}
				style={{
					marginTop: 30,
					borderRadius: 5,
					width: 150,
					height: 50,
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "gray",
				}}
			>
				<Text>UPDATE</Text>
			</TouchableOpacity>
		</View>
	);
};

export default DateSlider;
