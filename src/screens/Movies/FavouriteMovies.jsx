import { useState } from "react";
import { FlatList } from "react-native";
import { Image, ScrollView } from "react-native";
import { View, Text, StyleSheet, TextInput, ImageStore } from "react-native";
import movies from "../../data/movies";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import HandleLogged from "../../components/HandleLogged.jsx";
// =============REDUX================
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../Redux/Actions/updateAction";
// ===================================

const DATA = movies;
const FavouriteMovies = () => {
	const [searchResults, setSearchResults] = useState([]);
	const handleSearch = (searchTerm) => {
		const results = performSearch(searchTerm);
		setSearchResults(results);
	};
	const navigation = useNavigation();
	const loginUserData = useSelector((state) => state.personalInfor);
	const dispatch = useDispatch();

	// check if user is logged in in async storage and render another View
	const [isLogged, setIsLogged] = useState(false);
	const checkifLogged = async () => {
		const token = await AsyncStorage.getItem("token");
		if (token) {
			setIsLogged(true);
		}
	};

	useEffect(() => {
		checkifLogged();
		console.log(isLogged);
	}, []);

	return (
		<View style={{ width: "100%", height: "100%" }}>
			{loginUserData.token ? (
				<ScrollView>
					{/* =========== */}
					{DATA.map((item, index) => {
						return (
							<View key={index} style={{ paddingHorizontal: 20, marginBottom: 80, marginTop: 20 }}>
								<View style={{ backgroundColor: "white", borderRadius: 10 }}>
									<View
										style={{
											flexDirection: "column",
											paddingLeft: 20,
											paddingTop: 20,
											paddingBottom: 40,
										}}
									>
										<Text
											style={{
												fontWeight: "bold",
												fontSize: 20,
												marginVertical: 10,
											}}
										>
											{item.title}
										</Text>
										<View style={{ width: 180 }}>
											<Text style={{ color: "gray", fontSize: 12 }}>{item.types}</Text>
										</View>
										<Text
											style={{
												fontSize: 20,
												fontWeight: "bold",
												marginVertical: 10,
											}}
										>
											{item.price}
										</Text>
										<Image
											style={{
												borderRadius: "100",
												width: 150,
												height: 150,
												resizeMode: "cover",
												position: "absolute",
												bottom: -40,
												right: -10,
											}}
											source={{
												uri: item.image,
											}}
										/>
									</View>
								</View>
							</View>
						);
					})}

					{/* =========== */}
				</ScrollView>
			) : (
				<HandleLogged />
			)}
		</View>
	);
};

const exampleData = [
	{ id: "1", name: "Apple" },
	{ id: "2", name: "Banana" },
	{ id: "3", name: "Cherry" },
	{ id: "4", name: "Durian" },
	{ id: "5", name: "Elderberry" },
	{ id: "6", name: "Fig" },
	{ id: "7", name: "Grape" },
	{ id: "8", name: "Honeydew" },
	{ id: "9", name: "Jackfruit" },
	{ id: "10", name: "Kiwi" },
];

// const HandleLogged = () => {
// 	return (
// 		<View
// 			style={{
// 				width: "100%",
// 				height: "100%",
// 				flex: 1,
// 				alignItems: "center",
// 				justifyContent: "center",
// 			}}
// 		>
// 			<Text>Login</Text>
// 		</View>
// 	);
// };

export default FavouriteMovies;
