import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FeaturedScreen from "../screens/FeaturedScreen";

export default function HeaderMainScreen({ navigation }) {
  return (
    <SafeAreaView>
      <View style={styles.headerCont}>
        <View style={styles.titleCont}>
          <Icon
            style={styles.autoLeft}
            name="creditcard"
            size={22}
            color="#070707"
          />
          <Text style={styles.text}> Ticket Box </Text>
          <Icon
            style={styles.autoRight}
            name="search1"
            size={22}
            color="#070707"
          />
        </View>
        {/* navigate : all, featured  */}
        <View style={styles.navigateCont}>
          <TouchableOpacity style={styles.touch}>
            <Text>Featured</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touch}
            onPress={() => navigation.navigate("TextView")}
          >
            <Text>All</Text>
          </TouchableOpacity>
        </View>
        <FeaturedScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "800",
  },
  headerCont: {
    marginTop: 20,
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  titleCont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "2.5%",
    marginRight: "2.5%",
  },
  navigateCont: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  touch: {
    paddingVertical: 20,
    paddingHorizontal: 70,
  },
});
// export default HeaderMainScreen;
