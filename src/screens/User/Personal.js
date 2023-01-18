import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/Ionicons";

const Personal = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView>
        <View
          style={{
            backgroundColor: "#ffffff",
            marginTop: 15,
            borderRadius: 8,
            width: 350,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                padding: 15,
                alignItems: "center",
              }}
            >
              {/* avatar */}
              <View style={{}}>
                <Image
                  style={{ height: 80, width: 80, borderRadius: "100%" }}
                  source={{
                    uri: "https://blog.logrocket.com/wp-content/uploads/2020/11/create-avatar-feature-react.png",
                  }}
                />
              </View>
              {/* name and edit butotn */}
              <View style={{ marginLeft: 15 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Nguyễn Vinh
                </Text>
                <View
                  style={{
                    marginTop: 10,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "#990099",
                    alignItems: "center",
                    width: 80,
                  }}
                >
                  <Text
                    style={{ padding: 2, color: "#990099", fontWeight: "bold" }}
                  >
                    Chỉnh sửa
                  </Text>
                </View>
              </View>
            </View>
            {/* own tickets */}
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon3
                name="ticket-confirmation-outline"
                size={25}
                color={"#990099"}
              />
              <Text style={{ marginLeft: 20 }}>Vé của tôi</Text>
            </View>
          </View>
        </View>
        {/* ============ */}
        <View
          style={{
            backgroundColor: "#ffffff",
            marginTop: 15,
            borderRadius: 8,
            width: 350,
            paddingRight: 15,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 150, height: 150 }}
              source={{
                uri: "https://play-lh.googleusercontent.com/9s-9zONYk4NZvLlHVMIF5cGCzrx7PjZYQ3uow5P8Rj2Mt_XHWygV3gOt75_iI1YtTg",
              }}
            />
            <View style={{ flexShrink: 1 }}>
              <View>
                <Text>
                  Follow TicketBox để được cập nhật thông tin mới nhất
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  alignItems: "center",
                  marginTop: 5,
                  borderRadius: 5,
                  padding: 4,
                  borderColor: "#4267B2",
                  backgroundColor: "#4267B2",
                }}
              >
                <Text style={{ color: "#fafafa", fontWeight: "500" }}>
                  Mở Facebook
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* ========= */}
        <View
          style={{
            backgroundColor: "#ffffff",
            marginTop: 15,
            borderRadius: 8,
            width: 350,
            paddingRight: 15,
            paddingVertical: 10,
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={{ marginLeft: 15, fontWeight: "bold" }}>Cài đặt</Text>
          </View>
        </View>
        {/* =========== */}
        <View
          style={{
            backgroundColor: "#ffffff",
            marginTop: 15,
            borderRadius: 8,
            width: 350,
            paddingRight: 15,
            paddingVertical: 10,
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={{ marginLeft: 15, fontWeight: "bold" }}>Hỗ trợ</Text>
            <View style={{ marginLeft: 15, marginTop: 10 }}>
              <View
                style={{
                  borderBottomWidth: 1,
                  paddingVertical: 5,
                  borderBottomColor: "#C3BDBD",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon2 name="trash-2" color={"gray"} size={25} />
                <Text style={{ marginLeft: 10 }}>Xóa tài khoản</Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  paddingVertical: 5,
                  borderBottomColor: "#C3BDBD",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon name="exit-outline" color={"gray"} size={25} />
                <Text style={{ marginLeft: 10 }}>Thoát</Text>
              </View>
            </View>
          </View>
        </View>
        {/* =========== */}
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ color: "gray" }}> Phiên bản 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Personal;
