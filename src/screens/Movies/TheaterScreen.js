import { useNavigation, useRoute } from "@react-navigation/native";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useContext } from "react";
import { MovieCards } from "./Context";

const TheaterScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { seats, setSeats } = useContext(MovieCards);
  const onSeatSelect = (item) => {
    const seatSelected = seats.find((seat) => seat === item);

    console.log(seatSelected, "you pressed on");
    if (seatSelected) {
      setSeats(seats.filter((seat) => seat !== item));
    } else {
      setSeats([...seats, item]);
    }
  };

  // console.log(route.params);
  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#181818" }}>
      <View style={{ alignItems: "center" }}>
        {/* <Text style={{ color: "white" }}> {route.params.title}</Text> */}
        <Text style={{ color: "white", fontSize: 15, fontWeight: "700" }}>
          {route.params.mall}
        </Text>
        <Text style={{ color: "gray", fontSize: 12 }}>
          {route.params.timeSelected}
        </Text>
      </View>
      {/* Seats */}
      <View>
        <FlatList
          contentContainerStyle={{ alignItems: "center" }}
          numColumns={6}
          data={route.params.tableSeats}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => onSeatSelect(item)}
              style={{ margin: 10, borderRadius: 5 }}
            >
              {seats.includes(item) ? (
                <Text
                  style={{
                    borderColor: "white",
                    borderWidth: 0.5,
                    color: "black",
                    padding: 10,
                    borderRadius: 5,
                    backgroundColor: "orange",
                  }}
                >
                  {item}
                </Text>
              ) : (
                <Text
                  style={{
                    borderColor: "white",
                    borderWidth: 0.5,
                    color: "black",
                    padding: 10,
                    borderRadius: 5,
                    backgroundColor: "white",
                  }}
                >
                  {item}
                </Text>
              )}
            </Pressable>
          )}
        />
      </View>
      {/* Screen */}
      <View
        style={{
          marginTop: 15,
          borderWidth: 1,
          borderColor: "white",
          marginHorizontal: 30,
          shadowColor: "#fafafa",
          shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.8,
          shadowRadius: 12.35,

          elevation: 30,
        }}
      ></View>
      {/* notation seats */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 5,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name="circle" size={24} color="#5E5E5E" />
          <Text style={{ color: "white", fontSize: 10, marginHorizontal: 5 }}>
            Available
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name="circle" size={24} color="orange" />
          <Text style={{ color: "white", fontSize: 10, marginHorizontal: 5 }}>
            Selected
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name="circle" size={24} color="white" />
          <Text style={{ color: "white", fontSize: 10, marginHorizontal: 5 }}>
            Reserved
          </Text>
        </View>
      </View>
      {/* Payment field */}
      <View
        style={{
          width: "100%",
          height: 350,
          backgroundColor: "#4E4E4E",
          marginTop: 20,
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            marginTop: 10,
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          About your ticket
        </Text>
        <View
          style={{ alignItems: "flex-start", marginLeft: 20, marginTop: 25 }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>
            Your Name : Nguyen Vinh
          </Text>
          <Text style={{ fontSize: 20, color: "white" }}>
            Movie: {route.params.title}
          </Text>
          <Text style={{ fontSize: 20, color: "white" }}>
            Date and time: 5AM 28/9/2023
          </Text>
          {seats.length > 0 ? (
            <Text style={{ fontSize: 20, color: "white" }}>
              {seats.length} seats selected !
            </Text>
          ) : (
            <Text style={{ fontSize: 20, color: "white" }}>
              No seats selected !
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
            marginTop: 30,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#D2D0D0", fontSize: 15 }}>Total price </Text>
            <Text style={{ color: "white", fontSize: 18 }}>43.55$</Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "orange",
              padding: 30,
              borderRadius: 50,
              width: 200,
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ fontWeight: "bold" }}>Book Ticket</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TheaterScreen;

const styles = StyleSheet.create({});
