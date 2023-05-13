import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useForm } from "react-hook-form";
import { loginValidation } from "../../Validation/UserValidation";
// const baseUrl = "http://192.168.1.47:5000";
import { baseURL } from "../../api/client/private.client";
import { login } from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
// improt AntDesign
import AntDesign from "react-native-vector-icons/AntDesign";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [userInfor, setUserInfor] = useState({});

	const [data, setData] = useState([]);

	// validate user
	const { register, handleSubmit, errors } = useForm({
		validationSchema: loginValidation,
	});
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

	// const handleLogin = async () => {
	// 	try {
	// 		await login(email, password);
	// 		navigation.navigate("Home");
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

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
			await AsyncStorage.setItem("token", response.data.token);
			// save all data of user by async storage
			await AsyncStorage.setItem("name", response.data.name);
			// show the data user by async storage

			console.log(response.data);
			if (response.status === 200) {
				alert("Login successfully");
				setUserInfor(response.data.user);
				setIsLoading(false);
				navigation.navigate("Home", {
					// token: response.data.token,
					name: response.data.name,
					isAdmin: response.data.isAdmin,
					image: response.data.image,
					email: response.data.email,
				});
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
		handleLogin();
	}, []);

	return (
		<View style={styles.container}>
			{/* create icon Home with navigation.replace("Home") in the top left of the screen*/}
			<TouchableOpacity
				style={{
					position: "absolute",
					top: 130,
					left: 25,
					zIndex: 20,
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
				onPress={() => navigation.replace("Home")}
			>
				<AntDesign name="home" size={26} color="black" />
				<Text style={{ fontSize: 27, marginLeft: 10 }}>Home</Text>
			</TouchableOpacity>

			<Text style={styles.title}>Login</Text>
			<TextInput
				style={styles.input}
				onChangeText={onChangeEmailHandler}
				value={email}
				placeholder="Email"
				keyboardType="email-address"
				autoCapitalize="none"
			/>
			<TextInput
				style={styles.input}
				onChangeText={onChangePasswordHandler}
				value={password}
				placeholder="Password"
				secureTextEntry
				autoCapitalize="none"
			/>
			<View style={{ flexDirection: "column" }}>
				<TouchableOpacity style={styles.button} onPress={handleLogin}>
					<Text style={styles.buttonText}>Tiếp tục</Text>
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
						style={styles.button}
						onPress={() => {
							navigation.navigate("Register");
						}}
					>
						<Text style={styles.buttonText}>Register</Text>
					</TouchableOpacity>
				</View>
				{/* Message Error View when login failed */}
				{/* {messageType === 'FAILED' && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ color: 'red' }}>{message}</Text>
        </View>
      )} */}
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

export default Login;
