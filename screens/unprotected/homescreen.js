import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "./component/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "./utils/urlstorage";

function HomeScreen() {
  const [isGettingProduct, setIsGettingProduct] = useState(false);
  const [getThreeProducts, setGetThreeProducts] = useState([]);

  console.log(getThreeProducts);

  async function getProduct() {
    try {
      setIsGettingProduct(true);
      const res = await axios.get(`${url}/products`);
      const data = res.data.products;

      let newData = [];
      for (let i = 0; i < 3; i++) {
        const randomNumber = Math.floor(Math.random() * data.length);
        const randomProduct = data[randomNumber];
        newData.push(randomProduct);
        // newData = randomProduct;
      }
      // console.log(newData);

      setGetThreeProducts(newData);

      setIsGettingProduct(false);
    } catch (error) {
      setIsGettingProduct(false);
      console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  // const newData = getThreeProducts.slice(0, 3);
  return (
    <View style={{ backgroundColor: "#caf0f8", flex: 1 }}>
      <ScrollView>
        <View style={styles.topCon}>
          <Text style={styles.title}>Design Your Comfort Zone</Text>
          <Text style={styles.titleText}>
            Welcome to our online sanctuary where style meets serenity –
            introducing{" "}
            <Text style={{ color: "#0077b6", fontWeight: 700 }}>
              ComfiableHomes
            </Text>{" "}
            Dive into a world where you can "Design Your Comfort Zone", curated
            with a harmonious blend of elegance and ease. Discover a collection
            that transcends trends, offering a seamless fusion of design and
            comfort that empowers you to shape your surroundings with a touch of
            personal luxury. Immerse yourself in a shopping experience where
            every click brings you closer to creating a space that reflects your
            unique taste and embraces the essence of coziness.
          </Text>
          <Button
            title="Shop Now"
            btnStyle={styles.shopnow}
            btnText={styles.shopnowText}
          />
        </View>
        <View>
          <Text style={styles.productTitleText}>Featured Products </Text>
          <View style={styles.line}></View>
          {isGettingProduct ? (
            <Text>Loading</Text>
          ) : (
            getThreeProducts.map((each) => {
              return (
                <View key={each._id}>
                  <Image
                    source={{ uri: each.image }}
                    style={{ width: 100, height: 100 }}
                  />
                  <View>
                    <Text>{each.type}</Text>
                    <Text>$ {each.price}</Text>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  topCon: {
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 47,
    fontWeight: 900,
    textAlign: "center",
    marginBlock: 10,
    letterSpacing: 5,
  },
  titleText: {
    fontSize: 18,
    letterSpacing: 2,
    textAlign: "center",
    lineHeight: 25,
    marginBlock: 20,
  },
  shopnow: {
    backgroundColor: "#0077b6",
    padding: 10,
    width: 150,
    marginInline: "auto",
    borderRadius: 7,
    marginBottom: 50,
  },
  shopnowText: {
    textAlign: "center",
    color: "#ffff",
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 2,
  },
  productTitleText: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: 900,
    marginTop: 90,
  },
  line: {
    height: 5,
    width: 150,
    backgroundColor: "#0077b6",
    marginTop: 10,
    marginBottom: 70,
    marginInline: "auto",
  },
});
