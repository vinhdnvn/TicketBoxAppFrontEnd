import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import featured from "../../data/featured";
import movies from "../../data/movies";
import category from "../../data/category";
import { useState } from "react";

const SRC_WIDTH = Dimensions.get("window").width;
const CARD_LENGTH = SRC_WIDTH * 0.6;
const SPACING = SRC_WIDTH * 0.05; //0.02
const SIDECARD_LENGTH = (SRC_WIDTH * 0.18) / 2;

const FeaturedScreen = () => {
  const navigation = useNavigation();
  const DATA = movies;
  const FEATURED = featured;
  const CATEGORY = category;
  const types = [
    {
      id: "0",
      name: "EVENT",
    },
    {
      id: "1",
      name: "2D",
    },
    {
      id: "2",
      name: "3D",
    },
    {
      id: "3",
      name: "Aniversary",
    },
    {
      id: "4",
      name: "Meeting",
    },
    {
      id: "5",
      name: "Special",
    },
  ];

  return (
    <View style={{ width: "100%", height: 600 }}>
      <View
        style={{
          margin: 15,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Category</Text>
        <Text style={{ color: "orange", fontWeight: "700" }}>
          See all {">"}
        </Text>
      </View>
      {/* List category */}
      <View>
        <ScrollView
          horizontal
          style={{ height: 120 }}
          showsHorizontalScrollIndicator={false}
        >
          {CATEGORY.map((item, index) => (
            <View key={index} style={{ alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "#515151",
                  width: 60,
                  height: 60,
                  borderRadius: 20,
                  shadowColor: "#FFFFFF",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  marginHorizontal: 15,
                  elevation: 2,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: "25" }}>{item.icon}</Text>
              </View>
              <View style={{ marginTop: 8 }}>
                <Text style={{ color: "gray", fontSize: 12 }}>{item.type}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={{ marginHorizontal: 15 }}>
        <Text style={{ fontWeight: "bold", color: "white" }}>
          Showing in this month ✨
        </Text>
      </View>
      <View>
        <MovieList DATA={DATA}></MovieList>
      </View>
    </View>
  );
};

const MovieList = ({ DATA }) => {
  const [scrollX, setScrollX] = useState(0);

  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        data={DATA}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Movie Detail", {
                  title: item.title,
                  time: item.time,
                  types: item.types,
                  address: item.address,
                  price: item.price,
                  image: item.image,
                  synopsis: item.synopsis,
                })
              }
            >
              <View
                scrollX={scrollX}
                style={{
                  width: CARD_LENGTH,
                  height: 330,
                  overflow: "hidden",
                  marginLeft: Number == 0 ? SIDECARD_LENGTH : SPACING,
                  marginRight: Number == 2 ? SIDECARD_LENGTH : SPACING,
                  borderRadius: 20,
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Image
                    style={{ aspectRatio: 4 / 3, height: "100%" }}
                    source={{
                      uri: item.image,
                    }}
                  />
                </View>
              </View>
              <Text style={{ color: "gray", fontSize: 12, marginTop: 5 }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        onScroll={(event) => {
          setScrollX(event.nativeEvent.contentOffset.x);
        }}
      />
    </View>
  );
};

export default FeaturedScreen;

const style = StyleSheet.create({
  imageContent: {
    position: "absolute",
    height: 110,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    top: "55%%",
    left: 30,
    width: "85%",
  },
});
