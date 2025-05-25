import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

function UserDropdown({ ...props }) {
  const [isDropdown, setIsDropdown] = useState(false);

  return (
    <DrawerContentScrollView {...props}>
      <View>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.userCon}>
        <Entypo name="users" size={24} color="black" />
        <Text onPress={() => {}}>User</Text>
      </View>
      {isDropdown && <Text>Dropdown</Text>}
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
});
