import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "./component/button";
import { useState } from "react";

function ProductScreen() {
  const [isShow, setIsShow] = useState(false);

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
        <Pressable onPress={() => setIsShow(!isShow)}>
          <Text style={styles.filter}>
            <AntDesign name="filter" size={24} color="black" /> Filter
          </Text>
        </Pressable>
      </View>
      {isShow && (
        <View style={styles.filterOptCon}>
          <View>
            <Text style={styles.CatCom}>Category</Text>
            <Text style={styles.categoryList}>All</Text>
            <Text style={styles.categoryList}>Office</Text>
            <Text style={styles.categoryList}>Living Room</Text>
            <Text style={styles.categoryList}>Kitchen</Text>
            <Text style={styles.categoryList}>Bedroom</Text>
            <Text style={styles.categoryList}>Dining Room</Text>
            <Text style={styles.categoryList}>Kids</Text>
            <Button
              title="Clear Filters"
              btnStyle={styles.clearFilter}
              btnText={styles.clearText}
            />
          </View>
          <View>
            <Text style={styles.CatCom}>Company</Text>
            <TextInput value="All" style={styles.allCompany} />
          </View>
        </View>
      )}
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
  filterOptCon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingHorizontal: 40,
    backgroundColor: "#bbdefb",
  },
  CatCom: {
    fontSize: 25,
    fontWeight: "600",
  },
  categoryList: {
    fontSize: 20,
    fontWeight: "700",
    opacity: 0.6,
    marginTop: 20,
  },
  clearFilter: {
    backgroundColor: "#ef233c",
    padding: 10,
    width: 150,
    // alignSelf: "center",
    borderRadius: 7,
    marginBottom: 50,
    marginTop: 20,
  },
  clearText: {
    textAlign: "center",
    color: "#ffff",
    fontSize: 20,
    fontWeight: "600",
  },
  allCompany: {
    borderWidth: 1,
    borderColor: "#8d99ae",
    borderRadius: 7,
    height: 40,
    backgroundColor: "#fff",
    marginTop: 10,
  },
});
