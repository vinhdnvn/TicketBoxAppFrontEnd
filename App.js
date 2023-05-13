import { StyleSheet, StatusBar, View } from "react-native";
// ICON
import Film from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/Feather";
import Home from "react-native-vector-icons/Feather";
import Icon4 from "react-native-vector-icons/AntDesign";
// =======
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/OpeningScreen/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OwnTicket from "./src/screens/User/OwnTicket";
import Personal from "./src/screens/User/Personal";
import BookingMovie from "./src/screens/Movies/BookingMovie";
import FeaturedScreen from "./src/screens/OpeningScreen/FeaturedScreen";
import CinemaPicker from "./src/screens/Movies/CinemaPicker";
import TheaterScreen from "./src/screens/Movies/TheaterScreen";
import { MovieContext } from "./src/screens/Movies/Context";
import FavouriteMovies from "./src/screens/Movies/FavouriteMovies";
import DateSlider from "./src/components/DateSlider";
import Login from "./src/screens/Login_Register/Login";
import Register from "./src/screens/Login_Register/Register";
import { useEffect, useState } from "react";

import { Provider } from "react-redux";
import { store } from "./src/Redux/store.js";

// ==========Loading Animation===========
import LottieView from "lottie-react-native";

// ===========REDUX===========
import { useDispatch, useSelector } from "react-redux";
import { setStart } from "./src/Redux/Actions/updateAction.js";
import { MAIN_COLOR_TEXT, PRIMARY_COLOR } from "./src/Style/styles";

// ============================

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// status bar

const TabNavigator = () => {
	const user = useSelector((state) => state.personalInfor);
	const dispatch = useDispatch();

	useEffect(() => {
		setTimeout(() => {
			dispatch(setStart());
		}, 1000);
	}, []);

	if (user.isLoading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#820b0f",
				}}
			>
				<LottieView
					style={{ width: 280, height: 280, backgroundColor: "#820b0f" }}
					source={require("./src/data/34590-movie-theatre.json")}
					autoPlay
					loop
				/>
			</View>
		);
	}
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					backgroundColor: "black",
				},
				tabBarActiveTintColor: "white",
				tabBarInactiveTintColor: "#555555",
				tabBarShowLabel: false,
			}}
		>
			<Tab.Screen
				name="Tickets"
				component={OwnTicket}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => <Home name="home" size={25} color={color} />,
				}}
			/>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => <Film name="film" size={25} color={color} />,
				}}
			/>
			<Tab.Screen
				name="FavouriteMovies"
				component={FavouriteMovies}
				options={{
					headerShown: true,
					tabBarActiveTintColor: "red",
					tabBarIcon: ({ color }) => <Icon2 name="heart" size={25} color={color} />,
				}}
			/>

			<Tab.Screen
				name="Account"
				component={Personal}
				options={{
					headerShown: true,
					tabBarIcon: ({ color }) => <Icon4 name="user" size={25} color={color} />,
				}}
			/>
			<Tab.Screen
				name="DateTest"
				component={DateSlider}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => <Icon4 name="user" size={25} color={color} />,
				}}
			/>
		</Tab.Navigator>
	);
};

export default function App() {
	const styleTypes = ["default", "dark-content", "light-content"];
	const [visibleStatusBar, setVisibleStatusBar] = useState(false);
	const [styleStatusBar, setStyleStatusBar] = useState(styleTypes[2]);

	return (
		<Provider store={store}>
			<NavigationContainer>
				<StatusBar barStyle={styleStatusBar} />
				<MovieContext>
					<Stack.Navigator>
						{/* create stack screen for login component */}

						<Stack.Screen
							name="TabNavigator"
							component={TabNavigator}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="Movie Detail"
							component={BookingMovie}
							options={{
								headerShown: false,
								headerStyle: {
									backgroundColor: "white",
								},
								headerTitleStyle: {
									color: "black",
								},
								headerBackTitle: "",
								headerTintColor: "black",
							}}
						/>
						<Stack.Screen
							name="Theater"
							component={TheaterScreen}
							options={{
								headerStyle: {
									backgroundColor: "white",
								},
								headerTitleStyle: {
									color: "black",
								},
								headerBackTitle: "",
								headerTintColor: "black",
							}}
						/>
						<Stack.Screen
							name="Please choose 1 cinema !"
							component={CinemaPicker}
							options={{
								headerShown: true,
								headerStyle: {
									backgroundColor: "#151515",
								},
								headerTitleStyle: {
									color: MAIN_COLOR_TEXT,
								},
								headerBackTitle: "",
								headerTintColor: MAIN_COLOR_TEXT,
							}}
						/>
						<Stack.Screen
							name="FeaturedScreen"
							component={FeaturedScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Login"
							component={Login}
							options={{
								headerShown: false,
								headerTitle: "Login",
								headerTintColor: "black",
							}}
						/>
						<Stack.Screen
							name="Register"
							component={Register}
							options={{
								headerShown: false,
								headerTitle: "Please submit your information !",
								headerTintColor: "black",
							}}
						/>
						{/* <Stack.Screen
						name="Home"
						component={HomeScreen}
						options={{
							headerShown: false,
							tabBarIcon: ({ color }) => <Film name="film" size={25} color={color} />,
						}}
					/> */}
					</Stack.Navigator>
				</MovieContext>
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#3C3737",
	},
	back: {
		color: "white",
	},
});
