import { Text, View } from "react-native";

const MovieScreen = () => {
  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#181818" }}>
      {/* Sơ đồ chỗ ngồi */}
      <View>
        {/* SCREEEENNN */}
        <Text
          style={{
            color: "white",
            fontSize: 15,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          SCREEN
        </Text>
        <View
          style={{
            marginTop: 10,
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
        {/* ============== */}
        {/* SEAT */}
        <View></View>
        {/* ============ */}
      </View>
    </View>
  );
};

export default MovieScreen;
