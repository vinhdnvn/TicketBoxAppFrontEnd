import {
	View,
	StyleSheet,
	Text,
	Pressable,
	TouchableOpacity,
	Image,
	FlatList,
	Dimensions,
} from "react-native";
// import { Modal } from "react-native";
import { useState } from "react";
// import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import cinema from "../../data/cinema";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
// import CarouselSlider from "../../components/CarouselSlider";
import movies from "../../data/movies";
const CinemaPicker = () => {
	const route = useRoute();
	const [selectedDate, setSelectedDate] = useState("");
	const [mall, setMall] = useState([]);
	const [seatsData, setSeatsData] = useState([]);
	const cinemasData = cinema;
	const navigation = useNavigation();
	const movie = movies;

	// new
	const [scrolX, setScrolX] = useState(0);
	const theater = cinema;
	const SRC_WIDTH = Dimensions.get("window").width;
	const CARD_LENGTH = SRC_WIDTH * 0.6;
	const SPACING = SRC_WIDTH * 0.05; //0.02
	const SIDECARD_LENGTH = (SRC_WIDTH * 0.18) / 2;

	console.log(mall, "selected");
	return (
		<View
			style={{
				width: "100%",
				height: "100%",
				flexDirection: "column",
			}}
		>
			<FlatList
				contentContainerStyle={{ marginTop: "35%", justifyContent: "center" }}
				data={theater}
				horizontal
				keyExtractor={(item) => item.id}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<View style={{ alignItems: "center" }}>
						<TouchableOpacity
							onPress={() => {
								console.log(item.name);
								// console.log(item.tableData)
								setMall(item.name);
								setSeatsData(item.tableData);
								navigation.navigate("Theater", {
									nameMovie: route.params.nameMovie,
									tableSeats: item.tableData,
									imageMovies: route.params.imageMovies,
									nameTheater: item.name,
									genre: route.params.genre,
								});
							}}
							style={{ justifyContent: "center", alignItems: "center" }}
						>
							<View
								scrolX={scrolX}
								style={{
									width: 200,
									height: 300,
									overflow: "hidden",
									marginLeft: Number == 0 ? SIDECARD_LENGTH : SPACING,
									marginRight: Number == 2 ? SIDECARD_LENGTH : SPACING,
									borderRadius: 20,
								}}
							>
								<View style={{ alignItems: "center" }}>
									<Image
										style={{
											width: "100%",
											height: "100%",
											resizeMode: "contain",
											backgroundColor: "black",
										}}
										source={{ uri: item.image }}
									/>
								</View>
							</View>
							<Text style={{ fontSize: 18, fontWeight: "500", marginTop: 20 }}>{item.name}</Text>
						</TouchableOpacity>
					</View>
				)}
			></FlatList>

			{/* <CarouselSlider Theater={cinemasData} /> */}

			{/* <View>
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
      </View> */}
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
