import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { url } from "../utils/urlstorage";
import { getToken, removeToken } from "../utils/tokenstorage";
import LoadingIcon from "../utils/loadingicon";

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
      {isLoading ? (
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
                  <View></View>
                </View>
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
});
