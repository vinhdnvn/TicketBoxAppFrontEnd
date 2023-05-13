import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { baseURL } from "./client/private.client";

// Create an axios instance with default configuration
const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
});

// Add a request interceptor to add the token to each request
axiosInstance.interceptors.request.use(
	async (config) => {
		const token = await AsyncStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Define a function to fetch data from the API
export const fetchData = async (endpoint) => {
	try {
		const response = await axiosInstance.get(endpoint);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

// Define a function to log in and store the token
export const login = async (email, password) => {
	try {
		const response = await axios.post(`${baseURL}/api/users/login`, { email, password });
		const { token } = response.data;
		await AsyncStorage.setItem("token", token);
	} catch (error) {
		console.log(error);
	}
};

// Define a function to log out and remove the token
export const logout = async () => {
	try {
		await AsyncStorage.removeItem("token");
	} catch (error) {
		console.log(error);
	}
};
