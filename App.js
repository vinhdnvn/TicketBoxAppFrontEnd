import { StyleSheet, Ic } from "react-native";
// ICON
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon4 from "react-native-vector-icons/AntDesign";
// =======

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/OpeningScreen/HomeScreen";
import MovieScreen from "./src/screens/Movies/MovieScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OwnTicket from "./src/screens/User/OwnTicket";
import Personal from "./src/screens/User/Personal";
import BookingMovie from "./src/screens/Movies/BookingMovie";
import FeaturedScreen from "./src/screens/OpeningScreen/FeaturedScreen";
import BookingEvent from "./src/screens/Event/BookingEvent";
import CinemaPicker from "./src/screens/Movies/CinemaPicker";
import TheaterScreen from "./src/screens/Movies/TheaterScreen";
import { MovieContext } from "./src/screens/Movies/Context";
import FavouriteMovies from "./src/screens/Movies/FavouriteMovies";
import DateSlider from "./src/components/DateSlider";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "white",
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#DADADA",
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon2 name="calendar" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="FavouriteMovies"
        component={FavouriteMovies}
        options={{
          headerShown: true,
          tabBarActiveTintColor: "red",
          tabBarIcon: ({ color }) => (
            <Icon2 name="heart" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tickets"
        component={OwnTicket}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon3 name="ticket-confirmation-outline" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Personal}
        options={{
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Icon4 name="user" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DateTest"
        component={DateSlider}
        options={{
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Icon4 name="user" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <MovieContext>
        <Stack.Navigator>
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
          {/* <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          /> */}
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
            name="FeaturedScreen"
            component={FeaturedScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </MovieContext>
    </NavigationContainer>
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
