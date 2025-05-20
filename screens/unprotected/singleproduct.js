import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { url } from "../utils/urlstorage";
import axios from "axios";
import LoadingIcon from "../utils/loadingicon";

function SingleProduct() {
  const [singleProduct, setSingleProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const route = useRoute();
  const id = route.params.productId;
  //   console.log(id);

  async function getSingleProduct() {
    try {
      setIsLoading(true);
      const res = await axios.get(`${url}/products/${id}`);
      setSingleProduct(res.data.products);
      //   console.log(res.data.products);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      console.log("nothing worked yet");

      setIsLoading(false);
    }
  }

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  return (
    <View>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate("AllProduct")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text style={styles.headerText}>Details</Text>
      </View>
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <ScrollView>
          <View style={{ padding: 20 }}>
            <Image source={{ uri: singleProduct.image }} style={styles.img} />
            <Text></Text>
            <Text></Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

export default SingleProduct;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 150,
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
  },
  headerText: {
    fontWeight: "700",
  },
  img: {
    height: 200,
    width: "100%",
    borderRadius: 10,
  },
});
