import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MAX_RATING = 5;

const RatingStars = ({ size = 25, defaultRating = 0, onRatingPress }) => {
  const [rating, setRating] = useState(defaultRating);

  const handleRatingPress = (newRating) => {
    setRating(newRating);
    onRatingPress && onRatingPress(newRating);
  };

  const renderStar = (index) => {
    const iconName = index <= rating ? "ios-star" : "ios-star-outline";
    return (
      <TouchableOpacity
        style={{ paddingHorizontal: 3 }}
        key={index}
        onPress={() => handleRatingPress(index)}
      >
        <Ionicons name={iconName} size={size} color="#f5be0d" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {[...Array(MAX_RATING)].map((_, index) => renderStar(index + 1))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 22,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default RatingStars;
