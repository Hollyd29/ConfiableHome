import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { url } from "../utils/urlstorage";
import { getToken, removeToken } from "../utils/tokenstorage";
import LoadingIcon from "../utils/loadingicon";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import EvilIcons from "@expo/vector-icons/EvilIcons";

function CartScreen() {
  const [cart, setCart] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isRemoving, setIsRemoving] = useState(false);

  const [isAdding, setIsAdding] = useState(false);

  const [isSubtracting, setIsSubtracting] = useState(false);

  const [isId, setIsId] = useState(null);

  const navigation = useNavigation();

  async function AllCart() {
    try {
      setIsLoading(true);
      const token = await getToken();
      const res = await axios.get(`${url}/getCartItems`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data.items);
      setCart(res.data.items);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  async function handleRemove(id) {
    try {
      setIsRemoving(true);
      const token = await getToken();
      // console.log(id);

      await axios.delete(`${url}/deleteCart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Toast.show({
        type: "success",
        text1: "Successful",
        text2: "item updated successfully",
        visibilityTime: 3000,
        text2Style: { fontSize: 18 },
      });
      await AllCart();
      setIsRemoving(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message || "Something went wrong",
        visibilityTime: 3000,
        text2Style: { fontSize: 18 },
      });
      setIsRemoving(false);
    }
  }

  async function handleIncrease(id) {
    try {
      setIsId(id);
      setIsAdding(true);
      const token = await getToken();
      await axios.get(`${url}/increaseItem/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Toast.show({
        type: "success",
        text1: "Successful",
        text2: "Product Added successfully",
        visibilityTime: 3000,
        text2Style: { fontSize: 18 },
      });
      await AllCart();
      setIsAdding(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message || "Something went wrong",
        visibilityTime: 3000,
        text2Style: { fontSize: 18 },
      });
      setIsAdding(false);
    }
  }

  async function handleDecrease(id) {
    try {
      setIsId(id);
      setIsSubtracting(true);
      const token = await getToken();
      await axios.get(`${url}/decreaseItem/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Toast.show({
        type: "success",
        text1: "Successful",
        text2: "Item quantity have been updated",
        visibilityTime: 3000,
        text2Style: { fontSize: 18 },
      });
      await AllCart();
      setIsSubtracting(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message || "Something went wrong",
        visibilityTime: 3000,
        text2Style: { fontSize: 18 },
      });
      setIsSubtracting(false);
    }
  }

  // useEffect(() => {
  //   handleIncrease();
  // }, []);

  // useEffect(() => {
  //   handleDecrease();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      AllCart();
    }, [])
  );

  return (
    <View style={{ paddingBottom: 30 }}>
      <Text style={styles.cartCount}>Cart: {cart.length} items </Text>
      {isLoading && !isAdding && !isSubtracting ? (
        <View style={{ alignSelf: "center", marginTop: "50%" }}>
          <LoadingIcon />
        </View>
      ) : (
        <FlatList
          data={cart}
          renderItem={(each) => {
            // console.log(each);
            return (
              <View
                style={{
                  paddingHorizontal: 20,
                  marginTop: 20,
                }}
              >
                <View style={styles.itemCon}>
                  <View style={{ position: "relative" }}>
                    <Image
                      source={{ uri: each.item.image }}
                      style={{ height: 100, width: 100 }}
                    />
                    <Text style={styles.outofstock}>OUT OF STOCK</Text>
                  </View>
                  <View>
                    <Text style={styles.type}>{each.item.type}</Text>
                    <Text style={styles.brand}>{each.item.brand}</Text>
                    <Text style={styles.price}>$ {each.item.price}</Text>
                    <Text style={styles.available}>{each.item.available}</Text>
                  </View>
                </View>
                <View style={styles.countCon}>
                  {isRemoving ? (
                    <Text>Removing</Text>
                  ) : (
                    <Pressable
                      style={styles.deleteCon}
                      onPress={() => handleRemove(each.item._id)}
                      disabled={isRemoving}
                    >
                      <MaterialIcons
                        name="delete-outline"
                        size={22}
                        color="#0077b6"
                      />
                      <Text style={{ color: "#0077b6", fontSize: 18 }}>
                        Remove
                      </Text>
                    </Pressable>
                  )}
                  <View style={styles.count}>
                    <FontAwesome
                      name="minus-square"
                      size={30}
                      color="#0077b6"
                      onPress={() => handleDecrease(each.item._id)}
                    />
                    {each.item._id === isId && (isAdding || isSubtracting) ? (
                      <EvilIcons name="refresh" size={24} color="black" />
                    ) : (
                      <Text style={{ fontSize: 18 }}>{each.item.counter}</Text>
                    )}
                    <FontAwesome
                      name="plus-square"
                      size={30}
                      color="#0077b6"
                      onPress={() => handleIncrease(each.item._id)}
                    />
                  </View>
                </View>
                <View style={styles.line}></View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

export default CartScreen;

const styles = StyleSheet.create({
  cartCount: {
    fontSize: 20,
    fontWeight: "700",
    opacity: 0.7,
    paddingBlock: 10,
    backgroundColor: "#ced4da",
  },
  itemCon: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  outofstock: {
    fontSize: 12,
    color: "#d90429",
    padding: 1,
    backgroundColor: "#ced4da",
    textAlign: "center",
    position: "absolute",
    bottom: 5,
    width: 100,
    borderRadius: 25,
  },
  type: {
    fontWeight: "500",
    fontSize: 17,
  },
  price: {
    fontWeight: "500",
    fontSize: 20,
  },
  available: {
    opacity: 0.6,
  },
  countCon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    alignItems: "center",
  },
  deleteCon: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingVertical: 5,
    alignItems: "center",
  },
  count: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  line: {
    height: 8,
    backgroundColor: "#dee2e6",
  },
});
