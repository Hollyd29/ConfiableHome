import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "./component/button";

function ProductScreen() {
  return (
    <View>
      <View>
        <View>
          <TextInput placeholder="Search" style={styles.search} />
          <Button
            title="Search"
            btnStyle={styles.searchBtn}
            btnText={styles.searchText}
          />
        </View>
        <Pressable>
          <Text style={styles.filter}>
            <AntDesign name="filter" size={24} color="black" /> Filter
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default ProductScreen;

const styles = StyleSheet.create({
  filter: {
    borderWidth: 1,
    borderColor: "#343a40",
    fontSize: 20,
    padding: 10,
    width: 100,
    alignSelf: "flex-end",
  },
  search: {
    borderWidth: 2,
    borderColor: "#343a40",
  },
  searchBtn: {
    backgroundColor: "#0077b6",
    padding: 10,
    width: 100,
    borderRadius: 7,
  },
  searchText: {
    textAlign: "center",
    color: "#ffff",
    fontSize: 20,
    fontWeight: 500,
  },
});
