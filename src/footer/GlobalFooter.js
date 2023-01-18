import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon4 from "react-native-vector-icons/AntDesign";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const GlobalFooter = ({ navigation }) => {
  return (
    <View style={styles.footerCont}>
      <Icon2 name="calendar" size={25} color="#9A9A9A" />

      <Icon
        name="film"
        size={25}
        color="#9A9A9A"
        onPress={() => navigation.navigate("MovieScreen")}
      />

      <Icon3 name="ticket-confirmation-outline" size={25} color="#9A9A9A" />

      <Icon4 name="user" size={25} color="#9A9A9A" />
    </View>
  );
};
export default GlobalFooter;

const styles = StyleSheet.create({
  footerCont: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingBottom: 25,
  },
  text: {
    color: "white",
  },
});
