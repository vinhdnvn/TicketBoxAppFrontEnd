import React, { useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
// import { Carousel } from "react-native-reanimated-carousel";
import FeaturedScreen from "./FeaturedScreen";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.pageCont}>
      {/* Header */}

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.navigateCont}>
            <View>
              <Text style={{ color: "gray", fontSize: 12 }}>
                Welcome Nguyễn Vinh 👋
              </Text>
              <Text
                style={{ color: "white", marginTop: 10, fontWeight: "bold" }}
              >
                Let's relax and watch movie !
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("Account")}>
                <View>
                  <Image
                    style={{ height: 30, width: 30, borderRadius: "100%" }}
                    source={{
                      uri: "https://blog.logrocket.com/wp-content/uploads/2020/11/create-avatar-feature-react.png",
                    }}
                  ></Image>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* search bar */}
          <View
            style={{ backgroundColor: "#474747", margin: 15, borderRadius: 20 }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Đây là search bar
            </Text>
          </View>
          <FeaturedScreen />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  pageCont: {
    height: "100%",
    width: "100%",
    flex: 1,
    backgroundColor: "#181818",
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginTop: 40,
  },
  touch: {
    paddingVertical: 20,
    paddingHorizontal: 70,
  },
});
