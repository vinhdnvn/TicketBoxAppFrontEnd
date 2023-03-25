import { useState } from "react";
import { FlatList } from "react-native";
import { Image, ScrollView } from "react-native";
import { View, Text, StyleSheet, TextInput, ImageStore } from "react-native";
import movies from "../../data/movies";
// import { TextInput } from "react-native-paper";

const DATA = movies;
const FavouriteMovies = () => {
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (searchTerm) => {
    const results = performSearch(searchTerm);
    setSearchResults(results);
  };
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View>
        <SearchBar />
      </View>
      <ScrollView>
        {/* =========== */}
        {DATA.map((item, index) => {
          return (
            <View
              key={index}
              style={{ paddingHorizontal: 20, marginBottom: 80 }}
            >
              <View style={{ backgroundColor: "white", borderRadius: 10 }}>
                <View
                  style={{
                    flexDirection: "column",
                    paddingLeft: 20,
                    paddingTop: 20,
                    paddingBottom: 40,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                      marginVertical: 10,
                    }}
                  >
                    {item.title}
                  </Text>
                  <View style={{ width: 180 }}>
                    <Text style={{ color: "gray", fontSize: 12 }}>
                      {item.types}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginVertical: 10,
                    }}
                  >
                    {item.price}
                  </Text>
                  <Image
                    style={{
                      borderRadius: "100",
                      width: 150,
                      height: 150,
                      resizeMode: "cover",
                      position: "absolute",
                      bottom: -40,
                      right: -10,
                    }}
                    source={{
                      uri: item.image,
                    }}
                  />
                </View>
              </View>
            </View>
          );
        })}

        {/* =========== */}
      </ScrollView>
    </View>
  );
};

const exampleData = [
  { id: "1", name: "Apple" },
  { id: "2", name: "Banana" },
  { id: "3", name: "Cherry" },
  { id: "4", name: "Durian" },
  { id: "5", name: "Elderberry" },
  { id: "6", name: "Fig" },
  { id: "7", name: "Grape" },
  { id: "8", name: "Honeydew" },
  { id: "9", name: "Jackfruit" },
  { id: "10", name: "Kiwi" },
];

// Search bar
const SearchBar = () => {
  const [search, setSearch] = useState("");

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: "#f9c2ff",
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
        }}
      >
        <Text>{item.name}</Text>
      </View>
    );
  };

  const filteredData = exampleData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 30,
      }}
    >
      <TextInput
        style={{
          height: 40,
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 16,
          marginBottom: 16,
        }}
        placeholder="Search"
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      />
    </View>
  );
};

export default FavouriteMovies;
