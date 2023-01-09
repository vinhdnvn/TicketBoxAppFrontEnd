import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import featured from "../../data/featured";
import movies from "../../data/movies";

export default function FeaturedScreen() {
  const DATA = movies;
  const FEATURED = featured;
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
      <View>
        <ScrollView
          horizontal
          style={{ height: 230 }}
          showsHorizontalScrollIndicator={false}
        >
          {FEATURED.map((item, index) => (
            <View
              key={index}
              style={{
                borderLeftWidth: 0.5,
                borderRightWidth: 0.5,
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                borderRadius: 4,
                marginRight: 20,
              }}
            >
              <ImageBackground
                style={{ aspectRatio: 7 / 3, height: 170 }}
                source={{
                  uri: item.image,
                }}
              >
                <Pressable style={style.imageContent}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 5,
                    }}
                  >
                    <View>
                      <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                        {item.title}
                      </Text>
                      <Text style={{ color: "gray", fontSize: 14 }}>
                        {item.location}
                      </Text>
                    </View>
                    <Pressable
                      style={{
                        backgroundColor: "orange",
                        padding: 10,
                        borderRadius: 6,
                      }}
                    >
                      <Text style={{ textAlign: "center", fontWeight: "400" }}>
                        Đặt vé
                      </Text>
                    </Pressable>
                  </View>
                  <Text style={{ marginTop: 10, fontWeight: "500" }}>
                    {item.types}
                  </Text>
                </Pressable>
              </ImageBackground>
            </View>
          ))}
        </ScrollView>
      </View>

      <ListCont types={types}></ListCont>
      <MovieList DATA={DATA}></MovieList>
    </View>
  );
}

const MovieList = ({ DATA }) => {
  return (
    <ScrollView style={{ alignSelf: "center" }}>
      {DATA.map((item, index) => (
        <View
          key={index}
          style={{
            borderColor: "#D0C9C9",
            borderWidth: 0.5,
            borderRadius: 5,
            marginBottom: 10,
            marginHorizontal: 5,
          }}
        >
          <Pressable>
            <Image
              style={{ aspectRatio: 7 / 2.9, height: 150, borderRadius: 3 }}
              source={{ uri: item.image }}
            />
            <View style={{ marginLeft: 6, marginTop: 8 }}>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                Phim Chiếu Rạp : {item.title}
              </Text>
              <View style={{ marginTop: 4 }}>
                <Text style={{ fontSize: 12, color: "gray" }}>{item.time}</Text>
                <Text style={{ fontSize: 12, color: "gray" }}>
                  {item.types}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 6,
                }}
              >
                <View
                  style={{
                    marginRight: 14,
                    borderColor: "black",
                    borderWidth: 0.5,
                    backgroundColor: "black",
                    borderRadius: 5,
                    padding: 4,
                    marginTop: 4,
                  }}
                >
                  <Text style={{ fontSize: 13, color: "white" }}>
                    {item.address}
                  </Text>
                </View>
                <View
                  style={{
                    marginRight: 14,
                    borderColor: "black",
                    borderWidth: 0.5,
                    borderColor: "#706D6D",
                    backgroundColor: "white",
                    borderRadius: 5,
                    padding: 4,
                    marginTop: 4,
                  }}
                >
                  <Text style={{ fontSize: 13, color: "#706D6D" }}>
                    {item.price}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
};
const ListCont = ({ types }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {types.map((item, index) => (
          <View
            style={{
              padding: 5,
              margin: 10,
              borderColor: "black",
              borderWidth: 0.5,
              borderRadius: 4,
            }}
            key={index}
          >
            <Text style={{ fontSize: 14 }}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

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
