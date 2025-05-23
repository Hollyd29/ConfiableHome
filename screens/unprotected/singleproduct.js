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
import Button from "../component/button";
import Toast from "react-native-toast-message";
import { getToken } from "../utils/tokenstorage";

function SingleProduct() {
  const [singleProduct, setSingleProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const navigation = useNavigation();

  const route = useRoute();
  const id = route.params.productId;
  //   console.log(id);

  //   console.log(getToken());

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

  async function handleAddToCart() {
    try {
      setIsAdding(true);
      const token = await getToken();
      const res = await axios.post(
        `${url}/addToCart`,
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //   console.log(res.data.products);

      Toast.show({
        type: "success",
        text1: "Successful",
        text2: "Product Add To Cart Successful",
        visibilityTime: 3000,
        text2Style: { fontSize: 18 },
      });
      setIsAdding(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message,
        visibilityTime: 3000,
        text2Style: { fontSize: 18 },
      });
      setIsAdding(false);
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
            <View>
              <Image source={{ uri: singleProduct.image }} style={styles.img} />
              <Text style={styles.type}>{singleProduct.type}</Text>
              <Text style={styles.brand}>Brand: {singleProduct.brand}</Text>
              <Text style={styles.price}>$ {singleProduct.price}</Text>
              <Text style={styles.available}>{singleProduct.available}</Text>
              <Text style={styles.review}>review: {singleProduct.reviews}</Text>
              <View>
                <View style={styles.descriptCon}>
                  <Text>Description</Text>
                  <Pressable onPress={() => setIsShow(!isShow)}>
                    {isShow && <AntDesign name="up" size={24} color="black" />}
                    {!isShow && (
                      <AntDesign name="down" size={24} color="black" />
                    )}
                  </Pressable>
                </View>
                {isShow && (
                  <View>
                    <Text style={styles.content}>{singleProduct.content}</Text>
                    <Text style={styles.sku}>SKU: {singleProduct.sku}</Text>
                  </View>
                )}
              </View>
              <Button
                title={isAdding ? "Loading..." : "Add to cart"}
                btnStyle={styles.btn}
                btnText={styles.btntext}
                btnPress={handleAddToCart}
                disablebtn={isAdding}
              />
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
    marginVertical: "50%",
  },
  img: {
    height: 200,
    width: "100%",
    borderRadius: 10,
  },
  type: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },
  brand: {
    fontWeight: "500",
    marginTop: 5,
  },
  price: {
    fontSize: 25,
    fontWeight: "900",
    marginTop: 10,
  },
  available: {
    fontWeight: "700",
    marginTop: 5,
    opacity: 0.6,
  },
  review: {
    fontSize: 18,
    marginTop: 5,
  },
  descriptCon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#dee2e6",
    marginTop: 20,
    borderRadius: 5,
  },
  content: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 25,
  },
  sku: {
    marginTop: 20,
    fontWeight: "500",
  },
  btn: {
    backgroundColor: "#0077b6",
    paddingBlock: 8,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 100,
  },
  btntext: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
    letterSpacing: 3,
    fontWeight: "600",
  },
});
