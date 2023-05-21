import React from "react";
import {
	View,
	SafeAreaView,
	Text,
	TextInput,
	ActivityIndicator,
	FlatList,
	Image,
	TouchableOpacity,
} from "react-native";

import { baseURL } from "../../api/client/private.client";
import { useEffect } from "react";
import axios from "axios";
import { PRIMARY_COLOR } from "../../Style/styles";
import filter from "lodash.filter";
import { useNavigation } from "@react-navigation/native";

const SearchingScreen = React.memo(() => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [data, setData] = React.useState([]); // data is an array of objects
	const [searchQuerry, setSearchQuerry] = React.useState("");
	const [error, setError] = React.useState(null);
	const [fullData, setFullData] = React.useState([]); // fullData is an array of objects

	useEffect(() => {
		setIsLoading(true);
		fetchData(`${baseURL}/api/movies`);
	}, []);

	const fetchData = async (url) => {
		try {
			const response = await fetch(url);
			const json = await response.json();
			setData(json.movies);
			// console.log(json.movies);
			setFullData(json.movies);
			console.log(fullData);
			setIsLoading(false);
		} catch (error) {
			setError(error);
			console.log(error);
			setIsLoading(false);
		}
	};

	const handleSearch = (query) => {
		setSearchQuerry(query);
		const formattedQuery = query;
		const filteredData = filter(fullData, (movie) => {
			return contains(movie, formattedQuery);
		});
		setData(filteredData);
	};

	const contains = ({ nameMovie }, query) => {
		if (nameMovie.includes(query)) {
			return true;
		}
		return false;
	};

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size={"large"} color={PRIMARY_COLOR} />
			</View>
		);
	}

	if (error) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text>Error in fetching data ... Please check your internet connection !</Text>
			</View>
		);
	}

	const navigation = useNavigation();

	return (
		<SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
			<TextInput
				placeholder="Search your movies !"
				clearButtonMode="always"
				// autoCapitalize="none"
				autoCorrect={false}
				style={{
					paddingHorizontal: 20,
					paddingVertical: 10,
					borderColor: "#ccc",
					borderWidth: 3,
					borderRadius: 8,
					marginTop: 15,
				}}
				value={searchQuerry}
				onChangeText={(query) => handleSearch(query)}
			/>
			<FlatList
				style={{ marginTop: 15 }}
				data={data}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => (
					<View>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("Movie Detail", {
									movieId: item._id,
									description: item.description,
									nameMovie: item.nameMovie,
									rating: item.rating,
									rottenTomatoes: item.rottenTomatoes,
									ign: item.ign,
									gerne: item.gerne,
									image: item.image,
									video: item.video,
								});
							}}
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginVertical: 10,
								// borderWidth: 0.5,
								// padding: 8,
								// borderRadius: 10,
							}}
						>
							<Image
								style={{ width: 50, height: 50, borderRadius: 50 }}
								source={{ uri: item.image }}
							/>
							<View style={{ marginLeft: 10 }}>
								<Text numberOfLines={1} style={{ width: 280 }}>
									{item.nameMovie}
								</Text>
								<Text>{item.year}</Text>
							</View>
						</TouchableOpacity>
					</View>
				)}
			/>
		</SafeAreaView>
	);
});

export default SearchingScreen;
