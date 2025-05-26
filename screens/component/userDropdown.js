import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

function UserDropdown({ ...props }) {
  const [isDropdown, setIsDropdown] = useState(false);

  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props}>
      <View>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.userCon}>
        <Entypo name="users" size={24} color="black" />
        <Text
          onPress={() => {
            setIsDropdown(!isDropdown);
          }}
        >
          User
        </Text>
      </View>
      {isDropdown && (
        <View style={styles.dropCon}>
          <Text style={styles.text}>Orders</Text>
          <Text style={styles.text} onPress={() => navigation.navigate("User")}>
            Login
          </Text>
        </View>
      )}
    </DrawerContentScrollView>
  );
}

export default UserDropdown;

const styles = StyleSheet.create({
  userCon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 19,
    marginTop: 5,
  },
  dropCon: {
    padding: 10,
    marginTop: 5,
    backgroundColor: "#e3f2fd",
    display: "flex",
    gap: 10,
    marginLeft: 50,
    width: 120,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});
