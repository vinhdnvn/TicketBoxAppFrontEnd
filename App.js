import { StyleSheet, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TextView from "./src/header/TextView";
import HeaderMainScreen from "./src/header/HeaderMainScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <HomeScreen></HomeScreen>
    // </View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HeaderMainScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="TextView"
          component={TextView}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3C3737",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
