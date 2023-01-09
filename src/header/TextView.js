import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import movies from "../data/movies";
const DATA = movies;
const TextView = () => {
  const renderItem = ({ item }) => (
    <View>
      <Image
        style={{ aspectRatio: 7 / 3, height: 170 }}
        source={{ uri: item.image }}
      />
    </View>
  );
  return (
    <View>
      {/* <Image
        style={{ aspectRatio: 7 / 3, height: 170 }}
        source={{
          uri: "https://photo2.tinhte.vn/data/attachment-files/2022/12/6251992_cover.jpg",
        }}
      /> */}
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default TextView;

const styles = StyleSheet.create({});
