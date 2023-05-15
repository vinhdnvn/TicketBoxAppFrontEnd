// import View in react native

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { baseURL } from "../api/client/private.client";
import { useEffect } from "react";

// =========REDUX========
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/Actions/updateAction";
// ======================

const HandleLogged = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [userInfor, setUserInfor] = useState({});

	const [emailData, setEmailData] = useState("");
	const [nameData, setNameData] = useState("");
	const [imageData, setImageData] = useState("");
	const [isAdminData, setIsAdminData] = useState(false);

	const [data, setData] = useState([]);

	const onSubmit = (data) => {
		console.log(data);
		setIsLoading(true);
	};

	const onChangeEmailHandler = (email) => {
		setEmail(email);
	};
	const onChangePasswordHandler = (password) => {
		setPassword(password);
	};

	const loginUserData = useSelector((state) => state.personalInfor);
	const dispatch = useDispatch();

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
					response.data.email,
					response.data.name,
					response.data.isAdmin,
					response.data.image,
					response.data.token
				)
			);

			if (response.status === 200) {
				// alert("Login successfully");
				setUserInfor(response.data.user);
				setIsLoading(false);
				navigation.navigate("Account");
				// navigation.navigate('Home', { user: response.data.user });
			} else {
				alert("Login failed");
			}
		} catch (error) {
			console.log(error);
			alert("Network");
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			handleLogin();
		}, 200);
	}, []);

	if (loginUserData.isLoading) {
		return (
			<View
				style={{
					width: "100%",
					height: "100%",
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text> Loading</Text>
			</View>
		);
	}

	return (
		<View
			style={{
				width: "100%",
				height: "100%",
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 25 }}>Login</Text>
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
			<View style={{ flexDirection: "column" }}>
				<TouchableOpacity
					onPress={handleLogin}
					style={{
						padding: 12,
						borderRadius: 4,
					}}
				>
					<Text
						style={{
							color: "#32CD32",
							fontWeight: "bold",
							textAlign: "center",
							fontSize: 15,
						}}
					>
						Tiếp tục
					</Text>
				</TouchableOpacity>
				<View style={{ flexDirection: "row" }}>
					<Text
						style={{
							color: "gray",
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
								color: "#32CD32",
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
