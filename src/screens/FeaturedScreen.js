import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";

export default function FeaturedScreen() {
  return (
    <View>
      <ImageBackground
        style={{ aspectRatio: 7 / 3, height: 170 }}
        source={{
          uri: "https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/309613890_606674637922853_1092136251732434059_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=e3f864&_nc_ohc=wU68cBIEaT0AX_GDb3j&_nc_ht=scontent.fdad1-3.fna&oh=00_AfCcgCbdOxU9u7Yy8K6lUvQrfv6MEgZVsYhv_g_cDYE--Q&oe=63BD27E2",
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
                Trải nghiệm bắn súng tại Sài Gòn
              </Text>
              <Text style={{ color: "gray", fontSize: 14 }}>
                Hồ Chí Minh - Quận 4
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
            Sự kiện trải nghiệm
          </Text>
        </Pressable>
      </ImageBackground>
      <Text style={{ marginTop: 80 }}>ausihdiusahdi</Text>
    </View>
  );
}

const style = StyleSheet.create({
  imageContent: {
    position: "absolute",
    height: 130,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    top: "85%%",
    left: 20,
    width: "85%",
    height: 100,
  },
});
