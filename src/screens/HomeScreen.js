import React, { Component } from "react";
import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import HeaderMainScreen from "../header/HeaderMainScreen";
import FeaturedScreen from "./FeaturedScreen.js";

export default class HomeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.pageCont}>
        <HeaderMainScreen />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  pageCont: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  text: {
    color: "red",
  },
});
