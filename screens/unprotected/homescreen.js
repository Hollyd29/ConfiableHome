import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "./component/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "./utils/urlstorage";
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
  const [isGettingProduct, setIsGettingProduct] = useState(false);
  const [getThreeProducts, setGetThreeProducts] = useState([]);
  const [isShowMission, setIsShowMission] = useState(false);
  const [isShowVission, setIsShowVission] = useState(false);

  // console.log(getThreeProducts);

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

  const navigation = useNavigation();

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
            btnPress={() => navigation.navigate("Products")}
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
                  <Image source={{ uri: each.image }} style={styles.homeimg} />
                  <View style={styles.imgTextCon}>
                    <Text style={styles.imgText}>{each.type}</Text>
                    <Text style={styles.imgText}>$ {each.price}</Text>
                  </View>
                </View>
              );
            })
          )}
        </View>
        <Button
          title="ALL PRODUCTS"
          btnStyle={styles.allProduct}
          btnText={styles.allProductText}
          btnPress={() => navigation.navigate("Products")}
        />
        <View style={styles.customCon}>
          <View>
            <Text style={styles.customHeadText}>
              custom furniture{"\n"}built only for you
            </Text>
            <Text style={styles.customText}>
              We take pride in crafting bespoke pieces that transcend the
              ordinary. Our commitment to excellence is reflected in every
              detail, as we believe in the art of creating 'Custom Furniture
              Built Only For You.'
            </Text>
          </View>
          <View style={styles.misVisCon}>
            {/* the circle start */}
            <View style={styles.bigCircle}>
              <View style={styles.smallCircle}></View>
            </View>
            {/* {the circle end} */}
            <Text style={styles.misVisHeadText}>Mission</Text>
            <Text style={styles.misVisText}>
              At ComfiableHomes, our mission is to inspire and empower
              individuals to elevate their living spaces with comfort and style.
              We strive to curate a diverse collection of high-quality products
              that seamlessly blend form and function, enabling our customers to
              design their {!isShowMission && <Text>...</Text>}{" "}
              {isShowMission && (
                <Text>
                  ideal comfort zones. With a commitment to exceptional customer
                  service and a passion for delivering unparalleled shopping
                  experiences, we aim to be the go-to destination for those
                  seeking not just products, but a personalized expression of
                  their unique lifestyle. Join us in the pursuit of creating
                  spaces that embrace tranquility, warmth, and individuality –
                  because your comfort is our mission.
                </Text>
              )}{" "}
              <Text
                onPress={() => setIsShowMission(!isShowMission)}
                style={styles.read}
              >
                {isShowMission ? "read less" : "read more"}
              </Text>
            </Text>
          </View>
          <View style={styles.misVisCon}>
            {/* the circle start */}
            <View style={styles.bigCircle}>
              <View style={styles.smallCircle}></View>
            </View>
            {/* {the circle end} */}
            <Text style={styles.misVisHeadText}>Vission</Text>
            <Text style={styles.misVisText}>
              At ComfiableHomes, we envision a future where the act of designing
              one's comfort zone becomes a transformative and delightful
              journey. Our vision is to be the ultimate destination for
              individuals seeking a harmonious blend of style and comfort{" "}
              {!isShowVission && <Text>...</Text>}{" "}
              {isShowVission && (
                <Text>
                  in every facet of their lives. We strive to continually
                  innovate, offering an evolving array of curated products that
                  not only meet but exceed the evolving needs and desires of our
                  customers. As we grow, we aspire to become a trusted source,
                  fostering a community that shares a passion for creating
                  spaces that not only reflect personal style but also evoke a
                  sense of joy, relaxation, and well-being. At ComfiableHomes,
                  we believe in empowering everyone to design a life of comfort
                  and sophistication, making every home a haven.
                </Text>
              )}{" "}
              <Text
                onPress={() => setIsShowVission(!isShowVission)}
                style={styles.read}
              >
                {isShowVission ? "read less" : "read more"}
              </Text>
            </Text>
          </View>
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
    alignSelf: "center",
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
    alignSelf: "center",
  },
  homeimg: {
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
  allProduct: {
    backgroundColor: "#0077b6",
    padding: 10,
    width: 200,
    alignSelf: "center",
    borderRadius: 7,
    marginBlock: 80,
  },
  allProductText: {
    textAlign: "center",
    color: "#ffff",
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 2,
  },
  customCon: {
    backgroundColor: "#f8f9fa",
    paddingInline: 20,
    paddingTop: 100,
  },
  customHeadText: {
    fontSize: 30,
    fontWeight: 800,
    letterSpacing: 2,
    marginBottom: 20,
    textTransform: "capitalize",
  },
  customText: {
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: 1,
    marginBottom: 100,
  },
  misVisCon: {
    backgroundColor: "#0077b6",
    padding: 30,
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 50,
  },
  bigCircle: {
    height: 65,
    width: 65,
    borderRadius: 50,
    backgroundColor: "#0096c7",
    alignSelf: "center",
    marginBottom: 10,
  },
  smallCircle: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: "#0077b6",
    alignSelf: "center",
    marginBlock: "auto",
  },
  misVisHeadText: {
    color: "#ffffff",
    fontSize: 40,
    fontWeight: 800,
    alignSelf: "center",
    letterSpacing: 2,
  },
  misVisText: {
    color: "#ffffff",
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 5,
  },
  read: {
    color: "#212529",
    fontSize: 24,
    fontWeight: "500",
  },
});
