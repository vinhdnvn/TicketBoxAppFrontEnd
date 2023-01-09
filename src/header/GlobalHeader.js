import { View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const GlobalHeader = () => {
  return (
    <View style={styles.titleCont}>
      <Icon
        style={styles.autoLeft}
        name="creditcard"
        size={22}
        color="#070707"
      />
      <Text style={styles.text}> Ticket Box </Text>
      <Icon style={styles.autoRight} name="search1" size={22} color="#070707" />
    </View>
  );
};

export default GlobalHeader;

const styles = StyleSheet.create({
  pageCont: {
    height: "100%",
    width: "100%",
    marginTop: 15,
  },

  text: {
    color: "red",
  },
  text: {
    fontSize: 18,
    fontWeight: "800",
  },
  headerCont: {
    marginTop: 20,
    width: "100%",
  },
  titleCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "2.5%",
    marginRight: "2.5%",
  },
  navigateCont: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  touch: {
    paddingVertical: 20,
    paddingHorizontal: 70,
  },
});
