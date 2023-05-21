// import View in react native

import { CommonActions, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { baseURL } from "../api/client/private.client";
import { useEffect } from "react";

// =========REDUX========
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/Actions/updateAction";
import { setLogging } from "../Redux/Actions/loggedAction";
import { PRIMARY_COLOR, SECONDARY_COLOR_TEXT } from "../Style/styles";

// ======================

const HandleLogged = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const [userInfor, setUserInfor] = useState({});
	const onChangeEmailHandler = (email) => {
		setEmail(email);
	};
	const onChangePasswordHandler = (password) => {
		setPassword(password);
	};

	// create validate for email
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
	// create validate for password ( morethan 6 characters)
	const validatePassword = (password) => {
		if (password.length <= 4) {
			setPasswordError("Password must be at least 6 characters");
			return false;
		}
		// else password ==0 => error
		else if (password.length === 0) {
			setPasswordError("Password is required");
			return false;
		}
		setPasswordError("");
		return true;
	};

	const loginUserData = useSelector((state) => state.personalInfor);
	const dispatch = useDispatch();
	const loggingState = useSelector((state) => state.loggingInfor);

	const handleLogin = async () => {
		if (email === "" || password === "") {
			// alert("Please enter email and password to Login");
			return;
		}
		setIsLoading(true);
		try {
			const response = await axios.post(`${baseURL}/api/users/login`, {
				email,
				password,
			});
			// save token by async storage

			dispatch(
				loginUser(
					response.data._id,
					response.data.email,
					response.data.name,
					response.data.isAdmin,
					response.data.image,
					response.data.token
				)
			);
			dispatch(setLogging());

			if (response.status === 200) {
				// alert("Login successfully");
				setUserInfor(response.data.user);
				setIsLoading(false);
				navigation.dispatch(
					CommonActions.reset({
						index: 0,
						routes: [{ name: "Home" }],
					})
				);
				// navigation.navigate('Home', { user: response.data.user });
			} else {
				alert("Login failed");
			}
		} catch (error) {
			console.log(error);
			alert("Network");
		}
	};

	useEffect(() => {
		setTimeout(() => {
			handleLogin();
		}, 200);
	}, []);

	return (
		<View
			style={{
				width: "100%",
				height: "100%",
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: SECONDARY_COLOR_TEXT,
			}}
		>
			<Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 35 }}>Login</Text>
			<TextInput
				style={{
					height: 40,
					width: "80%",
					borderColor: "gray",
					backgroundColor: "#C0C0C0",
					borderRadius: 10,
					padding: 8,
					marginBottom: 16,
				}}
				placeholder="Email"
				keyboardType="email-address"
				autoCapitalize="none"
				onChangeText={onChangeEmailHandler}
			/>

			<TextInput
				onChangeText={onChangePasswordHandler}
				style={{
					height: 40,
					width: "80%",
					borderColor: "gray",
					backgroundColor: "#C0C0C0",
					borderRadius: 10,
					padding: 8,
					marginBottom: 16,
				}}
				placeholder="Password"
				secureTextEntry
				autoCapitalize="none"
			/>
			<Text style={{ color: "red", marginBottom: 8 }}>{emailError}</Text>
			<Text style={{ color: "red", marginBottom: 8 }}>{passwordError}</Text>
			<View style={{ flexDirection: "column" }}>
				<TouchableOpacity
					onPress={() => {
						// if validate email and password fasle => return
						if (!validateEmail(email) || !validatePassword(password)) {
							return;
						}
						handleLogin();
					}}
					style={{
						padding: 12,
						borderRadius: 4,
					}}
				>
					<Text
						style={{
							color: PRIMARY_COLOR,
							fontWeight: "bold",
							textAlign: "center",
							fontSize: 15,
						}}
					>
						Continue
					</Text>
				</TouchableOpacity>
				<View style={{ flexDirection: "row" }}>
					<Text
						style={{
							color: "black",
							fontSize: 15,
							fontWeight: "400",
							marginHorizontal: 2,
							marginTop: 11,
						}}
					>
						Don't have account ?
					</Text>
					<TouchableOpacity
						onPress={() => navigation.navigate("Register")}
						style={{
							padding: 12,
							borderRadius: 4,
						}}
					>
						<Text
							style={{
								color: PRIMARY_COLOR,
								fontWeight: "bold",
								textAlign: "center",
								fontSize: 15,
							}}
						>
							Register
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: -80,
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 25,
	},
	input: {
		height: 40,
		width: "80%",
		borderColor: "gray",
		backgroundColor: "#C0C0C0",
		borderRadius: 10,
		padding: 8,
		marginBottom: 16,
	},
	button: {
		padding: 12,
		borderRadius: 4,
	},
	buttonText: {
		color: "#32CD32",
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 15,
	},
});
export default HandleLogged;
