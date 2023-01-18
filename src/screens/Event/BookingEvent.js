import { useRoute } from "@react-navigation/native";
import { Text, View, Image } from "react-native";

const BookingEvent = () => {
  const route = useRoute();
  return (
    <View>
      <Text>{route.params.title}</Text>
      <Text>{route.params.location}</Text>
      <Text>{route.params.types}</Text>
      <Image
        style={{ aspectRatio: 7 / 3, height: 130 }}
        source={{ uri: route.params.image }}
      />
    </View>
  );
};

export default BookingEvent;
