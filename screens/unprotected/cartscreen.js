import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { url } from "../utils/urlstorage";
import { getToken, removeToken } from "../utils/tokenstorage";

function CartScreen() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = getToken();
  console.log(token.then);

  async function AllCart() {
    try {
      setIsLoading(true);
      const res = await axios.get(`${url}/getCartItems`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);

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
});
