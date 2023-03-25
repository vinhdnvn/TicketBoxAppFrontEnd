import { useRoute } from "@react-navigation/native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Heart from "react-native-vector-icons/AntDesign";
const BookingMovie = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        flex: 1,
        alignItems: "center",
      }}
    >
      <ScrollView style={{ width: "100%", height: "100%" }}>
        <View>
          <View
            style={{
              margin: 15,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View
              style={{
                shadowColor: "#ffffff",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 4,
              }}
            >
              <Image
                style={{
                  aspectRatio: 7 / 10,
                  resizeMode: "cover",
                  height: 320,
                  borderRadius: 10,
                }}
                source={{ uri: route.params.image }}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* type */}
              <View
                style={{
                  borderColor: "gray",
                  borderWidth: 0.2,
                  borderRadius: 10,
                  shadowColor: "#ffffff",
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowOpacity: 0.39,
                  shadowRadius: 8.3,

                  elevation: 13,
                  marginVertical: 18,
                  width: 100,
                }}
              >
                <View style={{ alignItems: "center", padding: 15 }}>
                  <Icon name="video-camera" size={15} color={"black"} />
                  <Text style={{ color: "gray", fontSize: 10 }}>Type</Text>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    {route.params.types}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  borderColor: "gray",
                  borderWidth: 0.2,
                  borderRadius: 10,
                  shadowColor: "#ffffff",
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowOpacity: 0.39,
                  shadowRadius: 8.3,

                  elevation: 13,
                  marginVertical: 18,
                  width: 100,
                }}
              >
                <View style={{ alignItems: "center", padding: 15 }}>
                  <Icon2 name="time-outline" size={20} color={"black"} />
                  <Text style={{ color: "gray", fontSize: 10 }}>Duration</Text>
                  <Text style={{ color: "black", fontSize: 12 }}>1h 20p</Text>
                </View>
              </View>
              {/* rating */}
              <View
                style={{
                  borderColor: "gray",
                  borderWidth: 0.2,
                  borderRadius: 10,
                  shadowColor: "#ffffff",
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowOpacity: 0.39,
                  shadowRadius: 8.3,

                  elevation: 13,
                  marginVertical: 18,
                  width: 100,
                }}
              >
                <View style={{ alignItems: "center", padding: 15 }}>
                  <Icon3 name="star" size={15} color={"black"} />
                  <Text style={{ color: "gray", fontSize: 10 }}>Rating</Text>
                  <Text style={{ color: "black", fontSize: 12 }}>8.7/10</Text>
                </View>
              </View>
            </View>
          </View>
          {/* title Film */}
          <View
            style={{
              paddingHorizontal: 30,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {route.params.title}
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 0.5,
              marginTop: 10,
              marginHorizontal: 30,
            }}
          ></View>
          {/* =========== */}
          {/* synopsis */}
          <View style={{ padding: 20 }}>
            <ScrollView>
              <View>
                <Text
                  style={{ color: "gray", fontSize: 15, letterSpacing: 0.8 }}
                >
                  {route.params.synopsis}
                </Text>
              </View>
            </ScrollView>
          </View>

          {/*---------------------- */}
        </View>
      </ScrollView>
      {/* button booking */}
      <View
        style={{
          marginBottom: 25,
          marginTop: 10,
          borderRadius: 30,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {/* Like Button */}
        <TouchableOpacity style={{ paddingRight: 50 }} onPress={handleLike}>
          {liked ? (
            <Heart name="heart" size={25} color="red" />
          ) : (
            <Heart name="hearto" size={25} color="black" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Please choose 1 cinema !", {
              title: route.params.title,
              image: route.params.image,
            });
          }}
        >
          <View
            style={{ backgroundColor: "orange", padding: 20, borderRadius: 30 }}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                paddingHorizontal: 30,
              }}
            >
              Get reservation
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingMovie;
