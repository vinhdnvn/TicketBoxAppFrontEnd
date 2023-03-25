import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  subDays,
} from "date-fns";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, Picker } from "react-native";
import PagerView from "react-native-pager-view";

const dates = eachWeekOfInterval(
  {
    start: subDays(new Date(), 14),
    end: addDays(new Date(), 14),
  },
  {
    weekStartsOn: 1,
  }
).reduce((acc: Date[][], cur) => {
  const allDays = eachDayOfInterval({
    start: cur,
    end: addDays(cur, 6),
  });

  acc.push(allDays);
  return acc;
}, []);
const DateSlider = () => {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            backgroundColor: "gray",
            padding: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#F3EDE7", marginBottom: 10 }}>Cinema ⬇️</Text>
          <Text style={{ color: "white" }}>CGV</Text>
        </View>
      </View>
      <PagerView
        style={{
          width: "100%",
          height: 80,
          marginTop: 10,
          backgroundColor: "red",
        }}
      >
        {dates.map((week, i) => {
          return (
            <View key={i}>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                {week.map((day, index) => {
                  const [isPressed, setIsPressed] = useState(false);

                  const handlePress = () => {
                    setIsPressed(!isPressed);
                    console.log(day.toLocaleDateString("en-GB"));
                  };
                  const buttonColor = isPressed ? "red" : "orange";
                  const txt = format(day, "EEE");
                  return (
                    <TouchableOpacity
                      onPress={handlePress}
                      style={{
                        alignItems: "center",
                        backgroundColor: buttonColor,
                        borderRadius: 10,
                        width: 50,
                        height: 60,
                        justifyContent: "center",
                      }}
                      key={index}
                    >
                      <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 10 }}>{txt}</Text>
                        <Text style={{ fontSize: 20 }}>{day.getDate()}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </PagerView>
    </View>
  );
};
const cinemas = [
  { label: "Cinema 1", value: "cinema1" },
  { label: "Cinema 2", value: "cinema2" },
  { label: "Cinema 3", value: "cinema3" },
];

const CinemaDropdown = () => {
  const [selectedCinema, setSelectedCinema] = useState("");

  const onCinemaChange = (cinema) => {
    setSelectedCinema(cinema);
  };

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontWeight: "bold" }}>Select a Cinema:</Text>
      <Picker
        selectedValue={selectedCinema}
        onValueChange={onCinemaChange}
        style={{ height: 50, width: "100%" }}
      >
        {cinemas.map((cinema) => (
          <Picker.Item
            key={cinema.value}
            label={cinema.label}
            value={cinema.value}
          />
        ))}
      </Picker>
      <Text>You selected: {selectedCinema}</Text>
    </View>
  );
};

export default DateSlider;
