import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { url } from "../utils/urlstorage";
import { getToken, removeToken } from "../utils/tokenstorage";

function CartScreen() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    AllCart();
  }, []);

  // useEffect(() => {
  //   removeToken();
  // }, []);

  return (
    <View>
      <Text style={styles.cartCount}>Cart: 2 items </Text>
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
                <Image
                  source={{ uri: each.item.image }}
                  style={{ height: 100, width: 100 }}
                />
                <View>
                  <Text>{each.item.category}</Text>
                  <Text>{each.item.brand}</Text>
                  <Text>able.God</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
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
});
