import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Modal } from "react-native";
import { useState } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import cinema from "../../data/cinema";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
const CinemaPicker = () => {
  const route = useRoute();
  const [selectedDate, setSelectedDate] = useState("");
  const [mall, setMall] = useState([]);
  const [seatsData, setSeatsData] = useState([]);
  const cinemasData = cinema;
  const navigation = useNavigation();

  console.log(mall, "selected");
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        flexDirection: "column",
      }}
    >
      <View>
        <Text style={{ color: "black" }}>Select date 👀</Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={new Date("2023-01-22")}
          endDate={new Date("2023-02-10")}
          initialSelectedDate={new Date("2020-02-01")}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />
      </View>
      <Text
        style={{
          color: "black",
          marginTop: 10,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Cinemas
      </Text>

      <View>
        {cinemasData.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => {
              setMall(item.name);
              setSeatsData(item.tableData);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
                borderWidth: 0.5,
                borderColor: "orange",
                borderRadius: 30,
                padding: 5,
              }}
            >
              <Image
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 30,
                  marginRight: 10,
                }}
                source={{ uri: item.image }}
              />
              <View>
                <Text
                  style={{ color: "black", fontSize: 18, fontWeight: "bold" }}
                >
                  {item.name}
                </Text>
                <Text numberOfLines={1} style={{ color: "gray", fontSize: 12 }}>
                  {item.address}
                </Text>
              </View>
            </View>

            {mall.includes(item.name) ? (
              <FlatList
                numColumns={3}
                data={item.showTimes}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() =>
                      navigation.navigate("Theater", {
                        mall: mall,
                        title: route.params.title,
                        timeSelected: item,
                        tableSeats: seatsData,

                        image: route.params.image,
                      })
                    }
                    style={{
                      borderColor: "orange",
                      borderWidth: 0.5,
                      width: 80,
                      borderRadius: 3,
                      margin: 10,
                      padding: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: "orange",
                        fontWeight: "500",
                        textAlign: "center",
                      }}
                    >
                      {item}
                    </Text>
                  </Pressable>
                )}
              />
            ) : null}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const ListOnClickCinema = ({ item }) => (
  <View>
    <FlatList
      data={item.showTimes}
      renderItem={({ item }) => {
        <Pressable>
          <Text>{item}</Text>
        </Pressable>;
      }}
    ></FlatList>
  </View>
);
const styles = StyleSheet.create({});

export default CinemaPicker;
