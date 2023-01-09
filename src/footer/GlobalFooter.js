import { View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";

const GlobalFooter = () => {
  return (
    <View style={styles.footerCont}>
      <Icon2 name="note" size={20} color="#9A9A9A" />

      <Icon name="addfile" size={20} color="#9A9A9A" />

      <Icon name="addfile" size={20} color="#9A9A9A" />

      <Icon name="addfile" size={20} color="#9A9A9A" />
    </View>
  );
};
export default GlobalFooter;

const styles = StyleSheet.create({
  footerCont: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingBottom: 30,
  },
  text: {
    color: "white",
  },
});
