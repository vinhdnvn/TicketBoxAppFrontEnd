import React, { Component } from "react";
import { Text, StyleSheet, View, ImageBackground } from "react-native";
import HeaderMainScreen from "../header/HeaderMainScreen";

export default class TextView extends Component {
  render() {
    return (
      <View>
        <ImageBackground
          source={{
            uri: "https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/309613890_606674637922853_1092136251732434059_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=e3f864&_nc_ohc=wU68cBIEaT0AX_GDb3j&_nc_ht=scontent.fdad1-3.fna&oh=00_AfCcgCbdOxU9u7Yy8K6lUvQrfv6MEgZVsYhv_g_cDYE--Q&oe=63BD27E2",
          }}
        ></ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
