import React, { Component, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  useWindowDimensions,
  Dimensions,
} from "react-native";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   useAnimatedScrollHandler,
//   interpolate,
// } from "react-native-reanimated";
const SRC_WIDTH = Dimensions.get("window").width;
const CARD_LENGTH = SRC_WIDTH * 0.6;
const SPACING = SRC_WIDTH * 0.05; //0.02
const SIDECARD_LENGTH = (SRC_WIDTH * 0.18) / 2;

const CustomImageCarouselSquare = ({ DATA }) => {
  const { width } = useWindowDimensions();
  const SIZE = width * 0.7;
  const SPACER = (width - SIZE) / 2;
  const [newData] = useState([
    { key: "spacer-left" },
    ...DATA,
    { key: "spacer-right" },
  ]);
  //   const x = useSharedValue(0);
  //   const onScroll = useAnimatedScrollHandler({
  //     onScroll: (event) => {
  //       x.value = event.contentOffset.x;
  //     },
  //   });
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
      snapToInterval={SIZE}
      decelerationRate="fast"
      //   onScroll={onScroll}
    >
      {newData.map((item, index) => {
        if (!item.image) {
          return <View style={{ width: SPACER }} key={index} />;
        }
        return (
          <View
            style={{
              width: SIZE,
              padding: 10,
            }}
            key={index}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default CustomImageCarouselSquare;
const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 34,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 300,
    aspectRatio: 1,
  },
});
