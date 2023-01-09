import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import FeaturedScreen from "./FeaturedScreen";
import Icon from "react-native-vector-icons/AntDesign";
import GlobalHeader from "../../header/GlobalHeader";
import GlobalFooter from "../../footer/GlobalFooter";
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.pageCont}>
      {/* Header */}
      <GlobalHeader />
      {/* Content */}
      <View>
        <View style={styles.navigateCont}>
          {/* <TouchableOpacity style={styles.touch}>
            <Text>Featured</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.touch}
            onPress={() => navigation.navigate("TextView")}
          >
            <Text style={{ fontWeight: "bold" }}>Nổi bật</Text>
          </TouchableOpacity>
        </View>
        <FeaturedScreen />
      </View>
      {/* Footer */}
      <GlobalFooter />
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  pageCont: {
    height: "100%",
    width: "100%",
    marginTop: 55,
    flex: 1,
  },

  text: {
    color: "red",
  },
  text: {
    fontSize: 18,
    fontWeight: "800",
  },
  headerCont: {
    marginTop: 20,
    width: "100%",
  },
  titleCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "2.5%",
    marginRight: "2.5%",
  },
  navigateCont: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  touch: {
    paddingVertical: 20,
    paddingHorizontal: 70,
  },
});
