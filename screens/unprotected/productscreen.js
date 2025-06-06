import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import LoadingIcon from "../utils/loadingicon";
import Button from "../component/button";
import { url } from "../utils/urlstorage";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";

const sort = [
  {
    value: "price",
    label: "Lowest",
    id: 1,
  },
  {
    value: "-price",
    label: "Highest",
    id: 2,
  },
  {
    value: "type",
    label: "A-Z",
    id: 3,
  },
  {
    value: "-type",
    label: "Z-A",
    id: 2,
  },
];
function ProductScreen() {
  const [isShow, setIsShow] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [isLoeading, setIsLoading] = useState(false);
  const [pickProduct, setPickProduct] = useState([]);
  const [inSort, setInSort] = useState("");
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");

  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  function handlePress(value) {
    if (value === "All") {
      setPickProduct(allProduct);
    } else if (value === "Office") {
      setPickProduct(allProduct.filter((item) => item.category === "Office"));
    } else if (value === "Living Room") {
      setPickProduct(
        allProduct.filter((item) => item.category === "Living Room")
      );
    } else if (value === "Kitchen") {
      setPickProduct(allProduct.filter((item) => item.category === "Kitchen"));
    } else if (value === "Bedroom") {
      setPickProduct(allProduct.filter((item) => item.category === "Bedroom"));
    } else if (value === "Dining") {
      setPickProduct(allProduct.filter((item) => item.category === "Dining"));
    } else {
      setPickProduct(allProduct.filter((item) => item.category === "Kids"));
    }
    setIsShow(!isShow);
  }

  async function onRefresh() {
    setRefreshing(true);
    await getAllProduct();
    setRefreshing(false);
  }

  async function getAllProduct() {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${url}/products?sort=${inSort}&search=${debounceSearch}`
      );
      setAllProduct(res.data.products);
      // console.log(res.data.products);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  // For delaying search for 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPickProduct(allProduct);
  }, [allProduct]);

  useEffect(() => {
    getAllProduct();
  }, [inSort, debounceSearch]);

  // useEffect(() => {
  //   getSort();
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerCon}>
        <View style={styles.searchCon}>
          <TextInput
            placeholder="Search"
            style={styles.search}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
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
            <Text
              style={styles.categoryList}
              onPress={() => handlePress("All")}
            >
              All
            </Text>
            <Text
              style={styles.categoryList}
              onPress={() => handlePress("Office")}
            >
              Office
            </Text>
            <Text
              style={styles.categoryList}
              onPress={() => handlePress("Living Room")}
            >
              Living Room
            </Text>
            <Text
              style={styles.categoryList}
              onPress={() => handlePress("Kitchen")}
            >
              Kitchen
            </Text>
            <Text
              style={styles.categoryList}
              onPress={() => handlePress("Bedroom")}
            >
              Bedroom
            </Text>
            <Text
              style={styles.categoryList}
              onPress={() => handlePress("Dining Room")}
            >
              Dining Room
            </Text>
            <Text
              style={styles.categoryList}
              onPress={() => handlePress("Kids")}
            >
              Kids
            </Text>
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
      {isLoeading ? (
        <Text></Text>
      ) : (
        <View style={{ marginLeft: 10 }}>
          <Text>{pickProduct.length} products found</Text>
          <View style={styles.sortCon}>
            <Text>Sort By:</Text>
            <Dropdown
              data={sort}
              labelField={"label"}
              valueField={"value"}
              onChange={(item) => {
                // console.log(item.value);
                setInSort(item.value);
              }}
              value={inSort}
              itemTextStyle={{ margin: -10 }}
              placeholder="Sort Product"
              containerStyle={{ borderWidth: 10 }}
              placeholderStyle={{}}
              style={styles.dropDownStyle}
            />
          </View>
        </View>
      )}

      <View style={{ backgroundColor: "#edf3ee", paddingBottom: 100 }}>
        {isLoeading ? (
          <View style={{ alignSelf: "center", marginTop: "50%" }}>
            <LoadingIcon />
          </View>
        ) : (
          <FlatList
            data={pickProduct}
            refreshing={refreshing}
            onRefresh={onRefresh}
            renderItem={(each) => {
              // console.log(each);

              return (
                <Pressable
                  onPress={() =>
                    navigation.navigate("SingleProduct", {
                      productId: each.item._id,
                    })
                  }
                >
                  <Image
                    source={{ uri: each.item.image }}
                    style={styles.productImg}
                  />
                  <View style={styles.imgTextCon}>
                    <Text style={styles.imgText}>{each.item.type}</Text>
                    <Text style={styles.imgText}>$ {each.item.price}</Text>
                  </View>
                </Pressable>
              );
            }}
            keyExtractor={(each) => each._id}
          />
        )}
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
  sortCon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  dropDownStyle: {
    borderWidth: 2,
    height: 25,
    width: 150,
    padding: 5,
    borderRadius: 5,
  },
  allCompany: {
    borderWidth: 1,
    borderColor: "#8d99ae",
    borderRadius: 7,
    height: 40,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  productImg: {
    width: "90%",
    height: 200,
    alignSelf: "center",
    marginTop: 30,
    borderRadius: 8,
  },
  imgTextCon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
  },
  imgText: {
    fontSize: 18,
    fontWeight: 600,
  },
});
