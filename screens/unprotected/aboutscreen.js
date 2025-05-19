import { Image, Text, View } from "react-native";
import image from "../../assets/image/about_img.jpeg";

function AboutScreen() {
  return (
    <View>
      <Image
        source={image}
        style={{ height: 300, width: "90%", alignSelf: "center" }}
      />
    </View>
  );
}

export default AboutScreen;
