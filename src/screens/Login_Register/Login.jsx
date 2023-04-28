import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { users_login } from "../../api/users/users_login";

import Constants from "expo-constants";
import axios from "axios";
const baseUrl = "http://172.20.10.13:5000";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const onChangeEmailHandler = (email) => {
		setEmail(email);
	};
	const onChangePasswordHandler = (password) => {
		setPassword(password);
	};
	const handleLogin = async () => {
		if (email === "" || password === "") {
			alert("Please enter email and password to Login");
			return;
		}
		setIsLoading(true);
		try {
			const response = await axios.post(`${baseUrl}/auth/login`, {
				email,
				password,
			});
			console.log(response.data);
			if (response.status === 200) {
				alert("Login successfully");
				setIsLoading(false);
				navigation.navigate("Home");
				// navigation.navigate('Home', { user: response.data.user });
			} else {
				alert("Login failed");
			}
		} catch (error) {
			console.log(error);
			alert("Login failed");
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLogin();
	}, []);

	return (
		<View style={styles.container}>
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
