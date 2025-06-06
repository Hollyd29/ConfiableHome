import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import LoadingIcon from "../utils/loadingicon";
import Button from "../component/button";
import screenWidth from "../utils/manageScreenWidth";
import { getProduct } from "../../actions/product.action";

function HomeScreen() {
  const [isGettingProduct, setIsGettingProduct] = useState(false);
  const [getThreeProducts, setGetThreeProducts] = useState([]);
  const [isShowMission, setIsShowMission] = useState(false);
  const [isShowVission, setIsShowVission] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const { width } = useWindowDimensions();
  // console.log(width);

  const headerContentSize = screenWidth(width, 375, 47, 35);
  const homeContentPadding = screenWidth(width, 600, 40, 0);

  // console.log(getThreeProducts);

  async function getHomeProduct() {
    await getProduct(setIsGettingProduct, setGetThreeProducts);
  }

  useEffect(() => {
    getHomeProduct();
  }, []);

  const navigation = useNavigation();

  // const newData = getThreeProducts.slice(0, 3);
  return (
    <View
      style={{
        backgroundColor: "#caf0f8",
        flex: 1,
        paddingHorizontal: homeContentPadding,
      }}
    >
      <ScrollView>
        <View style={styles.topCon}>
          <Text style={[styles.title, { fontSize: headerContentSize }]}>
            Design Your Comfort Zone
          </Text>
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
            <View style={{ alignSelf: "center", marginTop: 100 }}>
              <LoadingIcon />
            </View>
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
        <View style={{ marginTop: 70, paddingHorizontal: 20 }}>
          <Text style={styles.newsHeadText}>
            Join our newsletter and get 20% off
          </Text>
          <Text style={styles.newsText}>
            Embark on a journey to elevate your comfort and style. Explore our
            curated collection at ComfiableHomes and transform your living
            spaces into havens of personal luxury.
          </Text>
          <View style={styles.inputCon}>
            <TextInput
              value={emailInput}
              placeholder="Enter Email"
              onChangeText={(value) => setEmailInput(value)}
              style={styles.input}
            />
            <Button
              title="Subscribe"
              btnStyle={styles.emailBtn}
              btnText={styles.emailText}
            />
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
    // fontSize: 47,
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
  newsHeadText: {
    fontSize: 40,
    fontWeight: 700,
    marginBottom: 20,
    letterSpacing: 2,
  },
  newsText: {
    fontSize: 20,
    lineHeight: 27,
    marginBottom: 20,
  },
  inputCon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 80,
  },
  input: {
    borderWidth: 2,
    borderColor: "#495057",
    height: 40,
    width: "75%",
  },
  emailBtn: {
    backgroundColor: "#0077b6",
    height: 40,
    // width: 100,
    padding: 10,
  },
  emailText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
  },
});
