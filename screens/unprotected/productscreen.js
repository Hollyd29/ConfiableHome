import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "./component/button";

function ProductScreen() {
  return (
    <View>
      <View style={styles.headerCon}>
        <View style={styles.searchCon}>
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
  headerCon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  filter: {
    borderWidth: 1,
    borderColor: "#343a40",
    fontSize: 20,
    padding: 7,
    width: 100,
    borderRadius: 6,
  },
  searchCon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // marginLeft: 10,
  },
  search: {
    borderWidth: 2,
    borderColor: "#343a40",
    height: 40,
    width: 150,
  },
  searchBtn: {
    backgroundColor: "#0077b6",
    padding: 8,
    width: 100,
  },
  searchText: {
    textAlign: "center",
    color: "#ffff",
    fontSize: 20,
    fontWeight: 500,
  },
});
