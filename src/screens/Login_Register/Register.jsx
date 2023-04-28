// create component Register

import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text, Button, ScrollView } from "react-native";
import Back from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

// connect backend
import axios from "axios";
const baseUrl = "http://172.20.10.13:5000";

const Register = () => {
	const imageTop = require("./background_register.jpg");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);

	const handleDateOfBirthChange = (event, selectedDate) => {
		const currentDate = selectedDate || dateOfBirth;
		setShowDatePicker(Platform.OS === "ios");
		setDateOfBirth(currentDate);
	};

	const showDatepicker = () => {
		setShowDatePicker(true);
	};

	const [confirmPassword, setConfirmPassword] = useState("");
	const navigation = useNavigation();

	const handleRegister = async () => {
		// Handle register logic here
		try {
			const response = await axios.post(`${baseUrl}/auth/signup`, {
				email,
				name,
				dateOfBirth: dateOfBirth.toLocaleDateString("en-GB", {
					day: "numeric",
					month: "numeric",
					year: "numeric",
				}),
				phone,
				password,
			});
			console.log(response.data);
			if (response.status === 200) {
				alert("Register successfully");
				navigation.navigate("Login");
			} else {
				alert("Register failed, please try again!");
			}
		} catch (error) {
			console.log(error);
			alert("Register failed, please try again!");
		}
	};
	const logText = () => {
		console.log("logText");
		console.log("email: ", email);
		console.log("name: ", name);
		console.log(
			"dateOfBirth: ",
			dateOfBirth.toLocaleDateString("en-GB", {
				day: "numeric",
				month: "numeric",
				year: "numeric",
			})
		);
		console.log("phone: ", phone);
		console.log("password", password);
		console.log("confirmPass", confirmPassword);
	};

	return (
		<View style={{ width: "100%", height: "100%" }}>
			<View style={{ width: "100%", height: 150, backgroundColor: "rgb(45, 194, 117)" }}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Back
						name="arrow-left"
						size={30}
						color="white"
						style={{ marginTop: 50, marginLeft: 20 }}
					></Back>
				</TouchableOpacity>
			</View>
			<Image style={{ marginTop: -10, width: "100%", resizeMode: "contain" }} source={imageTop} />
			{/* input for insert information user to register */}
			<ScrollView style={{ width: "100%" }}>
				<View style={{ flexDirection: "column", height: "100%" }}>
					{/* insert email */}
					<View style={{ flexDirection: "column" }}>
						{/* create header text email */}
						<View style={{ flexDirection: "row", marginTop: 20, marginLeft: 20 }}>
							<Text style={{ fontSize: 15, fontWeight: "bold", color: "rgb(45, 194, 117)" }}>
								Email
							</Text>
						</View>
						{/* create input for email */}
						<View style={{ flexDirection: "row", marginTop: 10, marginLeft: 20 }}>
							<View
								style={{
									width: "95%",
									height: 40,
									backgroundColor: "white",
									borderRadius: 10,
									elevation: 5,
								}}
							>
								<TextInput
									style={{ marginLeft: 10, marginTop: 10 }}
									placeholder="abc@gmail.com"
									onChangeText={setEmail}
									value={email}
								/>
							</View>
						</View>
					</View>
					{/* insert your First Name */}
					<View style={{ flexDirection: "column" }}>
						{/* create header text First Name */}
						<View style={{ flexDirection: "row", marginTop: 20, marginLeft: 20 }}>
							<Text style={{ fontSize: 15, fontWeight: "bold", color: "rgb(45, 194, 117)" }}>
								First Name
							</Text>
						</View>
						{/* create input for First Name */}
						<View style={{ flexDirection: "row", marginTop: 10, marginLeft: 20 }}>
							<View
								style={{
									width: "95%",
									height: 40,
									backgroundColor: "white",
									borderRadius: 10,
									elevation: 5,
								}}
							>
								<TextInput
									style={{ marginLeft: 10, marginTop: 10 }}
									placeholder="David"
									onChangeText={setName}
									value={name}
								/>
							</View>
						</View>
					</View>
					{/* insert date of Birth */}
					<View style={{ flexDirection: "column" }}>
						{/* create header text date of Birth */}
						<View style={{ flexDirection: "row", marginTop: 20, marginLeft: 20 }}>
							<Text style={{ fontSize: 15, fontWeight: "bold", color: "rgb(45, 194, 117)" }}>
								Date of Birth
							</Text>
						</View>
						{/* create input for date of Birth */}
						<View
							style={{
								flexDirection: "row",
								justifyContent: "flex-start",
								alignItems: "flex-start",
							}}
						>
							<View style={{ marginBottom: 20, marginLeft: 20 }}>
								<TouchableOpacity
									style={{
										marginTop: 2,
										marginLeft: 5,
										backgroundColor: "rgb(45, 194, 117)",
										paddingHorizontal: 20,
										paddingTop: 8,
										paddingBottom: 8,
										borderRadius: 10,
									}}
									onPress={showDatepicker}
								>
									<Text>Select :</Text>
								</TouchableOpacity>
							</View>
							{showDatePicker && (
								<DateTimePicker
									testID="dateTimePicker"
									value={dateOfBirth}
									mode="date"
									display="default"
									onChange={handleDateOfBirthChange}
								/>
							)}
							{/* <Text>Date of Birth: {dateOfBirth.toDateString()}</Text> */}
						</View>
					</View>
					{/* insert phone user */}
					<View style={{ flexDirection: "column" }}>
						{/* create header text phone user */}
						<View style={{ flexDirection: "row", marginLeft: 20 }}>
							<Text style={{ fontSize: 15, fontWeight: "bold", color: "rgb(45, 194, 117)" }}>
								Phone
							</Text>
						</View>
						{/* create input for phone user */}
						<View style={{ flexDirection: "row", marginTop: 10, marginLeft: 20 }}>
							<View
								style={{
									width: "95%",
									height: 40,
									backgroundColor: "white",
									borderRadius: 10,
									elevation: 5,
								}}
							>
								<TextInput
									style={{ marginLeft: 10, marginTop: 10 }}
									placeholder="0123456789"
									onChangeText={setPhone}
									value={phone}
								/>
							</View>
						</View>
					</View>
					{/* insert password */}
					<View style={{ flexDirection: "column" }}>
						{/* create header text password */}
						<View style={{ flexDirection: "row", marginTop: 20, marginLeft: 20 }}>
							<Text style={{ fontSize: 15, fontWeight: "bold", color: "rgb(45, 194, 117)" }}>
								Password
							</Text>
						</View>
						{/* create input for password */}
						<View style={{ flexDirection: "row", marginTop: 10, marginLeft: 20 }}>
							<View
								style={{
									width: "95%",
									height: 40,
									backgroundColor: "white",
									borderRadius: 10,
									elevation: 5,
								}}
							>
								<TextInput
									style={{ marginLeft: 10, marginTop: 10 }}
									placeholder="********"
									onChangeText={setPassword}
									value={password}
								/>
							</View>
						</View>
					</View>
					{/* insert confirm password */}
					<View style={{ flexDirection: "column" }}>
						{/* create header text confirm password */}
						<View style={{ flexDirection: "row", marginTop: 20, marginLeft: 20 }}>
							<Text style={{ fontSize: 15, fontWeight: "bold", color: "rgb(45, 194, 117)" }}>
								Confirm Password
							</Text>
						</View>
						{/* create input for confirm password */}
						<View style={{ flexDirection: "row", marginTop: 10, marginLeft: 20 }}>
							<View
								style={{
									width: "95%",
									height: 40,
									backgroundColor: "white",
									borderRadius: 10,
									elevation: 5,
								}}
							>
								<TextInput
									style={{ marginLeft: 10, marginTop: 10 }}
									placeholder="********"
									onChangeText={setConfirmPassword}
									value={confirmPassword}
									textContentType="password"
								/>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
			<View style={{ justifyContent: "center", alignItems: "center", marginBottom: 22 }}>
				<TouchableOpacity
					onPress={() => handleRegister()}
					style={{
						backgroundColor: "rgb(45, 194, 117)",
						paddingHorizontal: 18,
						paddingVertical: 12,
						borderRadius: 20,
					}}
				>
					<Text style={{ color: "white" }}>Submit</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Register;
