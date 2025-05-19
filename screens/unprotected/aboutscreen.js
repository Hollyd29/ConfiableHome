import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import image from "../../assets/image/about_img.jpeg";

function AboutScreen() {
  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Image
          source={image}
          style={{ height: 300, width: "100%", borderRadius: 10 }}
        />
        <View>
          <Text style={styles.storyHead}>Our Story</Text>
          <View style={styles.line}></View>
        </View>
        <Text style={styles.storyText}>
          Welcome to ComfiableHomes, where passion meets purpose, and every
          click brings you closer to a world of curated comfort and style. As
          the architects of your comfort zones, we take pride in presenting an
          online destination that transcends the ordinary. Our story is one
          rooted in the belief that your living space should be a reflection of
          your individuality, a sanctuary where style and comfort intertwine
          seamlessly. At ComfiableHomes, we embarked on a journey to redefine
          the way you shop for your home, creating an experience that is as
          unique as the spaces you inhabit. What sets us apart is our unwavering
          commitment to quality, craftsmanship, and the art of curation. We
          understand that each piece of furniture, decor, or accessory is more
          than just an item – it's an expression of your taste, a statement of
          your personality. That's why we curate a collection that is not only
          visually stunning but also a celebration of functionality and
          durability. Our team of experts is dedicated to scouring the globe for
          the finest materials and designs, ensuring that every product you find
          on our platform is a testament to our commitment to excellence. From
          timeless classics to cutting-edge trends, we strive to offer a diverse
          range that caters to different tastes and preferences. What truly sets
          us apart, however, is our emphasis on customization. We believe that
          your home should tell your story, and our 'Design Your Comfort Zone'
          philosophy reflects this ethos. Explore our range of custom furniture,
          where you have the power to tailor every detail to suit your vision.
          It's not just furniture; it's an extension of your personality, a
          unique piece that resonates with you on a personal level. At
          ComfiableHomes, we're not just a marketplace – we're a community of
          individuals passionate about creating spaces that inspire, comfort,
          and delight. Our commitment doesn't end with a sale; it extends to
          ensuring that your experience with us is as memorable as the products
          you bring into your home. Thank you for choosing ComfiableHomes as
          your partner in the pursuit of comfort and style. We invite you to
          explore, create, and transform your living spaces with us. Your
          journey to a more comfortable and stylish home begins here.
        </Text>
      </View>
    </ScrollView>
  );
}

export default AboutScreen;

const styles = StyleSheet.create({
  storyHead: {
    fontSize: 45,
    fontWeight: "800",
    marginTop: 30,
  },
  line: {
    height: 5,
    backgroundColor: "#bbdefb",
    width: 150,
    marginLeft: 20,
    marginBottom: 30,
  },
  storyText: {
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 2,
    textAlign: "center",
  },
});
