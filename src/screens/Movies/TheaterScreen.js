import { useNavigation, useRoute } from "@react-navigation/native";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useContext } from "react";
import { MovieCards } from "./Context";
import Modal from "react-native-modal";
import { useState } from "react";

const TheaterScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { seats, setSeats } = useContext(MovieCards);
  const onSeatSelect = (item) => {
    const seatSelected = seats.find((seat) => seat === item);

    if (seatSelected) {
      setSeats(seats.filter((seat) => seat !== item));
    } else {
      setSeats([...seats, item]);
    }
  };

  console.log(seats, "you pressed on");

  // book ticket button
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // ======

  // feee payyying
  const fee = 87;
  const noOfSeats = seats.length;
  const total = seats.length > 0 ? fee + noOfSeats * 240 : 0;
  console.log(total);
  console.log(seats, "seats selected");

  // ======

  const showSeats = () => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {seats.map((seat, index) => (
          <Text key={index} style={{ color: "orange", fontSize: 18 }}>
            {seat}{" "}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        {/* <Text style={{ color: "white" }}> {route.params.title}</Text> */}
        <Text style={{ color: "black", fontSize: 15, fontWeight: "700" }}>
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
              style={{
                margin: 10,
                borderRadius: 2,
                borderColor: "black",
                borderWidth: 1,
              }}
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
                    backgroundColor: "#BCB9B9",
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
          <FontAwesome name="circle" size={24} color="#BCB9B9" />
          <Text style={{ color: "black", fontSize: 10, marginHorizontal: 5 }}>
            Available
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name="circle" size={24} color="orange" />
          <Text style={{ color: "black", fontSize: 10, marginHorizontal: 5 }}>
            Selected
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name="circle" size={24} color="black" />
          <Text style={{ color: "black", fontSize: 10, marginHorizontal: 5 }}>
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
            {/* Date and time: 5AM 28/9/2023 */}
            Time : {route.params.timeSelected}
          </Text>
          {seats.length > 0 ? (
            <View>
              <Text style={{ fontSize: 20, color: "white" }}>
                {seats.length} seats selected !
              </Text>
            </View>
          ) : (
            <Text style={{ fontSize: 20, color: "white" }}>
              No seats selected !
            </Text>
          )}
          {seats.length > 0 ? showSeats() : null}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
            // marginTop: 30,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#D2D0D0", fontSize: 15 }}>Total price </Text>
            <Text style={{ color: "white", fontSize: 18 }}>{total} $</Text>
          </View>

          <TouchableOpacity
            onPress={toggleModal}
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
            <Modal isVisible={isModalVisible}>
              <View style={{ flex: 1 }}>
                <Button title="Hide modal" onPress={toggleModal} />
                <View
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    height: 745,
                    borderRadius: 10,
                  }}
                >
                  <PaymentMethod />
                </View>
              </View>
            </Modal>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const PaymentMethod = () => {
  return (
    <View style={{ marginTop: 30, marginHorizontal: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={{ width: 70, height: 70 }}
          resizeMode="stretch"
          source={{
            uri: "https://m.media-amazon.com/images/I/61tftxkZaDL.jpg",
          }}
        />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontWeight: "600", fontSize: 25 }}>Avatar 2</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{}}>Seats: </Text>
            <Text style={{ fontWeight: "600" }}>G4,G5</Text>
            <Text> July 23, 2:30pm</Text>
          </View>
        </View>
      </View>
      {/* ========================== */}
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "gray" }}>Cost: </Text>
          <Text style={{ fontWeight: "600" }}>$120.00</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "gray" }}>Quanity: </Text>
          <Text style={{ fontWeight: "600" }}>2</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "gray" }}>Subtotal: </Text>
          <Text style={{ fontWeight: "600" }}>$240.00</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "gray" }}>Convenience fee: </Text>
          <Text style={{ fontWeight: "600", color: "green" }}>Free</Text>
        </View>
      </View>
      {/* ========================== */}
      <Text style={{ color: "gray" }}>
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      </Text>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ fontWeight: "700" }}>Total Amount</Text>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>$269.00</Text>
      </View>
      {/* ========================== */}
      <View style={{ marginTop: 15 }}>
        <Text style={{ fontSize: 25, fontWeight: "500" }}>Payment method</Text>
        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
          {/* payment method */}
          <TouchableOpacity
            style={{
              borderColor: "red",
              borderWidth: 1,
              borderRadius: 5,
              backgroundColor: "#F0F0F0",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ marginLeft: 10 }}>Payment Card</Text>
              <Image
                style={{ width: 50, height: 50, margin: 4, borderRadius: 5 }}
                source={{
                  uri: "https://www.investopedia.com/thmb/F8CKM3YkF1fmnRCU2g4knuK0eDY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MClogo-c823e495c5cf455c89ddfb0e17fc7978.jpg",
                }}
              />
            </View>
            <View
              style={{
                marginHorizontal: 6,
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text> xxxx xxxx xxxx 0242</Text>
              <Text>09/26</Text>
            </View>
          </TouchableOpacity>
          {/* ====== */}
          <TouchableOpacity
            style={{
              borderColor: "red",
              borderWidth: 1,
              borderRadius: 5,
              backgroundColor: "#F0F0F0",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ marginLeft: 10 }}>Payment Card</Text>
              <Image
                style={{ width: 50, height: 50, margin: 4, borderRadius: 5 }}
                source={{
                  uri: "https://www.investopedia.com/thmb/F8CKM3YkF1fmnRCU2g4knuK0eDY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MClogo-c823e495c5cf455c89ddfb0e17fc7978.jpg",
                }}
              />
            </View>
            <View
              style={{
                marginHorizontal: 6,
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text> xxxx xxxx xxxx 0242</Text>
              <Text>09/26</Text>
            </View>
          </TouchableOpacity>
          {/* ====== */}
          <TouchableOpacity
            style={{
              borderColor: "red",
              borderWidth: 1,
              borderRadius: 5,
              backgroundColor: "#F0F0F0",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ marginLeft: 10 }}>Payment Card</Text>
              <Image
                style={{ width: 50, height: 50, margin: 4, borderRadius: 5 }}
                source={{
                  uri: "https://www.investopedia.com/thmb/F8CKM3YkF1fmnRCU2g4knuK0eDY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MClogo-c823e495c5cf455c89ddfb0e17fc7978.jpg",
                }}
              />
            </View>
            <View
              style={{
                marginHorizontal: 6,
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text> xxxx xxxx xxxx 0242</Text>
              <Text>09/26</Text>
            </View>
          </TouchableOpacity>
          {/* ====== */}
        </View>
      </View>
      {/* ============ */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginRight: 12,
        }}
      >
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "red",
            borderRadius: 5,
            left: "33%",
            width: 100,
            alignItems: "center",
          }}
        >
          <Text
            style={{ paddingHorizontal: 20, paddingVertical: 8, color: "red" }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
        {/* ========== */}
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 5,
            width: 100,
            alignItems: "center",
          }}
        >
          <Text style={{ paddingHorizontal: 20, paddingVertical: 8 }}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TheaterScreen;
