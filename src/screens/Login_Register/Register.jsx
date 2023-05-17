// create component Register

import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text, Button, ScrollView } from "react-native";
import Back from "react-native-vector-icons/Feather";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

// connect backend
import axios from "axios";
import { baseURL } from "../../api/client/private.client";
const baseUrl = "http://172.20.10.13:5000";

const Register = () => {
	const imageTop = require("./background_register.jpg");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);

	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [nameError, setNameError] = useState("");
	const [phoneError, setPhoneError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

	const validateEmail = (email) => {
		const re = /\S+@\S+\.\S+/;
		if (!re.test(email)) {
			setEmailError("Email address is invalid");
			return false;
		} else if (email.length === 0) {
			setEmailError("Email is required");
			return false;
		}
		setEmailError("");
		return true;
	};

	const validatePassword = (password, confirmPassword) => {
		if (password.length <= 4) {
			setPasswordError("At least 6 characters");
			return false;
		}
		// else password ==0 => error
		else if (password.length === 0) {
			setPasswordError("Password is required");
			return false;
		}
		// if passwrd != confirm password => error
		else if (password !== confirmPassword) {
			setConfirmPasswordError("Password is not match");
			return false;
		}
		setPasswordError("");
		setConfirmPasswordError("");
		return true;
	};

	const validateName = (name) => {
		if (name.length === 0) {
			setNameError("Name is required");
			return false;
		}

		setNameError("");
		return true;
	};

	const validatePhone = (phone) => {
		if (phone.length === 0) {
			setPhoneError("Phone is required");
			return false;
		} else if (phone.length !== 10) {
			setPhoneError("Phone number must be 10 characters");
			return false;
		}
		setPhoneError("");
		return true;
	};

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

	const logText = async () => {
		try {
			await axios.post(`${baseURL}/api/users`, {
				email,
				name,
				password,
			});
			console.log("Create");
			// alert("Register successfully");
			navigation.navigate("Home");
		} catch (error) {
			console.log(error);
			alert("Register failed, please try again!");
		}
	};

	return (
		<View style={{ width: "100%", height: "100%" }}>
			<TouchableOpacity
				style={{ flexDirection: "row", alignItems: "center" }}
				onPress={() => navigation.goBack()}
			>
				<Back
					name="arrow-left"
					size={30}
					color="black"
					style={{ marginTop: 50, marginLeft: 20 }}
				></Back>
				<Text style={{ marginTop: 50, fontWeight: "500" }}>Back</Text>
			</TouchableOpacity>
			<View style={{ width: "70%", marginHorizontal: 20, marginTop: 20 }}>
				<Text style={{ fontSize: 25, fontWeight: "bold" }}>Create new account</Text>
				<Text style={{ fontSize: 15, color: "gray" }}>
					We really appreciate that you are going to join us !
				</Text>
			</View>

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
							<Text style={{ fontSize: 15, fontWeight: "bold", color: "red", marginLeft: 10 }}>
								{emailError}
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
							<Text style={{ fontSize: 15, fontWeight: "bold", color: "red", marginLeft: 10 }}>
								{nameError}
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
							<Text style={{ fontSize: 15, fontWeight: "bold", color: "red", marginLeft: 10 }}>
								{phoneError}
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
							<Text style={{ fontSize: 15, fontWeight: "bold", color: "red", marginLeft: 10 }}>
								{passwordError}
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
							<Text style={{ fontSize: 15, fontWeight: "bold", color: "red", marginLeft: 10 }}>
								{passwordError}
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
			<View style={{ justifyContent: "center", alignItems: "center", marginBottom: 60 }}>
				<TouchableOpacity
					onPress={logText}
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
