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
import AntDesign from "@expo/vector-icons/AntDesign";

function SingleProduct() {
  const [singleProduct, setSingleProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);

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
      <View style={{ padding: 20 }}>
        {isLoading ? (
          <View style={styles.icon}>
            <LoadingIcon />
          </View>
        ) : (
          <ScrollView>
            <Image source={{ uri: singleProduct.image }} style={styles.img} />
            <Text>{singleProduct.type}</Text>
            <Text>Brand: {singleProduct.brand}</Text>
            <Text>$ {singleProduct.price}</Text>
            <Text>{singleProduct.available}</Text>
            <Text>review: {singleProduct.reviews}</Text>
            <View>
              <View>
                <Text>Description</Text>
                <Pressable onPress={() => setIsShow(!isShow)}>
                  {isShow && <AntDesign name="up" size={24} color="black" />}
                  {!isShow && <AntDesign name="down" size={24} color="black" />}
                </Pressable>
              </View>
              {isShow && (
                <View>
                  <Text>{singleProduct.content}</Text>
                  <Text>SKU: {singleProduct.sku}</Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </View>
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
  icon: {
    alignSelf: "center",
    marginBlock: "50%",
  },
  img: {
    height: 200,
    width: "100%",
    borderRadius: 10,
  },
});
